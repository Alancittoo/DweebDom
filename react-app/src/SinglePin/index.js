import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPins, thunkGetSinglePin, thunkUpdatePin } from "../store/pin";
import { useHistory, useParams } from "react-router-dom";
import { thunkDeletePin } from "../store/pin";
import './SinglePin.css'
import { thunkGetBoards, thunkAddPinToBoard } from "../store/board";
import { thunkGetPinComments, thunkUpdateComment, thunkDeleteComment, thunkCreateComment } from "../store/comment";
import { thunkGetUserById } from "../store/session";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SinglePin() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const boards = useSelector(state => state.boards.allBoards)
    const pins = useSelector(state => state.pins.pins)
    const { pinId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [selectedBoardId, setSelectedBoardId] = useState(null)
    const [errors, setErrors] = useState([])
    const [isAdded, setIsAdded] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [isDupe, setIsDupe] = useState(false)
    // COMMENTS
    const [newComment, setNewComment] = useState("");
    const comments = useSelector(state => state.comments.comments);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentTextsContents] = useState("");
    const [commentUsers, setCommentUsers] = useState({});
    const [pinOwner, setPinOwner] = useState(null);

    useEffect(() => {
        console.log('Pin ID from useParams: ', pinId)
        dispatch(thunkGetPins())
            .then((res) => console.log('Result from thunkGetPins: ', res));
        dispatch(thunkGetSinglePin(pinId))
            .then((res) => console.log('Result from thunkGetSinglePin: ', res));

        dispatch(thunkGetBoards(currentUser.id))
            .then((res) => {
                console.log('Result from thunkGetBoards: ', res);
                setIsLoading(false)
            });
    }, [dispatch, pinId, currentUser.id])

    useEffect(() => {
        // console.log(pins)
        // console.log(pinId)
        dispatch(thunkGetSinglePin(pinId))
        if (pins && pins[pinId]) {
            setTitle(pins[pinId].title)
            setDescription(pins[pinId].description)
            setImageUrl(pins[pinId].image_url)
        }
        console.log(imageUrl)
    }, [pins, pinId]);

    useEffect(() => {
        dispatch(thunkGetSinglePin(pinId))
        dispatch(thunkGetPinComments(pinId));
        if (pins && pins[pinId]) {
            dispatch(thunkGetUserById(pins[pinId].user_id))
                .then((user) => {
                    if (user) {
                        setPinOwner(user);
                    }
                });
                //Grabbin the comments users , Needs fixin
            Object.values(comments).forEach(comment => {
                dispatch(thunkGetUserById(comment.user_id))
                    .then(user => {
                        if (user) {
                            setCommentUsers(oldUsers => {
                                return { ...oldUsers, [comment.user_id]: user.username }
                            });
                        }
                    })
            });
        }
    }, [dispatch, pinId, pins]);

    if (isLoading) {
        return <div style={{ color: 'white' }}>Loading...</div>
    }

    const handleDelete = () => {
        dispatch(thunkDeletePin(pinId));
        history.push('/home')
    }

    const handleAddToBoard = async (e) => {
        e.preventDefault();
        if (!selectedBoardId) {
            console.log('No board selected')
            setShowMessage(true)
            setIsDupe(false)
            setIsAdded(false)
            return;
        }
        const res = await dispatch(thunkAddPinToBoard(selectedBoardId, pinId))
        console.log('RES FOR ADDTOBOARD', res)
        if (res.error) {
            if (res.error === "This pin already exists for the board silly") {
                console.log('Pin already exists in this board')
                setIsAdded(false)
                setShowMessage(false)
                setIsDupe(true)
            } else {
                console.log('Failed to add pin to board')
                setIsAdded(false)
                setShowMessage(true)
                setIsDupe(false)
            }
        } else {
            console.log('Pin added to board')
            setIsAdded(true)
            setShowMessage(false)
            setIsDupe(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let newErrors = []

        if (title === "") newErrors.push("Title cannot be empty")
        if (imageUrl === "") newErrors.push("Image URL cannot be empty")
        if (newErrors.length > 0) {
            setErrors(newErrors)
            return
        }

        const pin = { title, description, image_url: imageUrl }
        const res = await dispatch(thunkUpdatePin(pin, pinId))
        if (res) {
            console.log('PIN', pin)
            dispatch(thunkGetSinglePin(pinId))
            setErrors([])
        }
        setIsEditing(false)
        // history.push(`/pins/${pinId}`)
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            comment: newComment,
            user_id: currentUser.id,
            pin_id: pinId
        };
        await dispatch(thunkCreateComment(comment));
        setNewComment("");
        dispatch(thunkGetPinComments(pinId));
        dispatch(thunkGetSinglePin(pinId))
    }

    const handleDeleteComment = async (commentId) => {
        await dispatch(thunkDeleteComment(commentId));
        dispatch(thunkGetPinComments(pinId));
    }

    const handleUpdateComment = async (e) => {
        e.preventDefault();

        if(editingCommentText.trim() === "") {
            alert("Comment cannot be empty");
            return;
        }

        const comment = { comment: editingCommentText };
        const success = await dispatch(thunkUpdateComment(comment, editingCommentId));
        if (success) {
            dispatch(thunkGetSinglePin(pinId))
            setEditingCommentId(null);
            setEditingCommentTextsContents("");
            dispatch(thunkGetPinComments(pinId))
        } else {
            return false
        }
    };

    return (
        <div className="SinglePin-container">
            {pins && (
                <div className="SinglePin-content" style={{ width: '30%', }}>
                    <img className="SinglePin-image"
                        src={pins[pinId]?.image_url}
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = '/brokenpt2.gif'
                        }}
                        alt={pins[pinId]?.title} />
                    <h1 className="SinglePin-title">{pins[pinId]?.title} </h1>
                    <Link to={`/user/${pinOwner?.id}`}>by {pinOwner?.username} </Link>
                    <p className="SinglePin-description">{pins[pinId]?.description}</p>

                    <form onSubmit={handleAddToBoard}>
                        <label >
                            Add to board:
                            <select
                                value={selectedBoardId}
                                style={{ marginLeft: '5px', borderRadius: '10px', marginTop: '15px', width: '22%' }}
                                onChange={(e) => {
                                    setSelectedBoardId(e.target.value)
                                    setShowMessage(false)
                                    setIsAdded(false)
                                }}>
                                <option style={{ width: '20%' }} value="">Select a board...</option>
                                {boards.map(board =>
                                    <option style={{ width: '10%' }} key={board.id} value={board.id}>{board.title}</option>
                                )}

                            </select>
                        </label>
                        <button className='addToYourBoardButton' style={{ border: '1px black solid', cursor: 'pointer', marginLeft: '15px', borderRadius: '10px' }} type="submit">+ Add to Your Board</button>
                        {isAdded && <div>Pin added to board!</div>}
                        {showMessage && <div>Please select a board! Or Create a new Board!</div>}
                        {isDupe && <div>The pin already exists for that board silly!</div>}
                    </form>
                    {currentUser.id === pins[pinId]?.user_id && (
                        <>

                            <button style={{ border: 'none', cursor: 'pointer', margin: '5px' }} onClick={() => setIsEditing(true)}>Update</button>
                            {isEditing && (
                                <form className='SinglePin-form' onSubmit={handleSubmit}>
                                    <label>
                                        Title:
                                        <input
                                            className="SinglePin-input"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Description:
                                        <input
                                            className="SinglePin-input"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Image URL:
                                        <input
                                            className="SinglePin-input"

                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </label>
                                    <button type="submit">Submit</button>
                                    {errors.map((error, idx) => (
                                        <div style={{ color: 'red' }}>{error}</div>
                                    ))}
                                </form>

                            )}
                            <p style={{ width: '30px', margin: '15px', cursor: 'pointer' }} onClick={handleDelete}><i class="fa-solid fa-trash-can"></i></p>
                        </>
                    )}
                    <div className="Comments-section">
                        <h2>Comments</h2>
                        {Object.values(comments).map(comment => (
                            <div key={comment.id}>
                                {editingCommentId === comment.id ? (
                                    <form onSubmit={handleUpdateComment}>
                                        <input
                                            value={editingCommentText}
                                            onChange={e => setEditingCommentTextsContents(e.target.value)}
                                        />
                                        <button className='comments-button' style={{ borderRadius: '10px' }} type="submit">Update Comment</button>
                                    </form>
                                ) : (
                                    <div>
                                        <h5>{comment.comment}</h5>
                                        {commentUsers[comment.user_id]
                                            ? <Link to={`/user/${comment.user_id}`}>by {commentUsers[comment.user_id]} </Link>
                                            : <p>Loading...</p>}
                                    </div>
                                )}
                                {comment.user_id === currentUser.id && (
                                    <div>
                                        <button className='comments-button' style={{ borderRadius: '10px', paddingLeft: "8px", paddingRight: "8px" }} onClick={() => {
                                            setEditingCommentId(comment?.id);
                                            setEditingCommentTextsContents(comment?.comment);
                                        }}>
                                            Edit
                                        </button>
                                        <button className='comments-button' style={{ borderRadius: '10px', marginBottom: "12px", border: "none", padding: "5px" }} onClick={() => handleDeleteComment(comment.id)}><i class="fa-solid fa-trash-can"></i>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <form onSubmit={handleCommentSubmit}>
                            <input value={newComment} style={{borderRadius: "10px", border: "1px black solid", paddingLeft: "8px", paddingRight: "8px"}} onChange={e => setNewComment(e.target.value)} placeholder="Add a comment" />
                            <button type="submit" className='comments-button' style={{ borderRadius: '10px' }}>Submit Comment</button>
                        </form>
                    </div>
                </div>

            )}
            {/* <h1>{console.log("SINGLE PIN", pins)}</h1> */}

        </div>
    );
}


export default SinglePin
