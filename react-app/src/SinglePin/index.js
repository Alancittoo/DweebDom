import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPins, thunkGetSinglePin, thunkUpdatePin } from "../store/pin";
import { useHistory, useParams } from "react-router-dom";
import { thunkDeletePin } from "../store/pin";
import './SinglePin.css'
import { thunkGetBoards, thunkAddPinToBoard } from "../store/board";


function SinglePin () {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const boards = useSelector(state => state.boards.allBoards)
    const pins = useSelector(state => state.pins.pins)
    const {pinId} = useParams()
    const currentUser = useSelector(state => state.session.user)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [selectedBoardId, setSelectedBoardId] = useState(null)
    // console.log(useSelector(state => state))

    useEffect(() => {
        dispatch(thunkGetPins())
        dispatch(thunkGetSinglePin(pinId))
        dispatch(thunkGetBoards(currentUser.id))
        .then(() => setIsLoading(false))
    }, [dispatch, pinId, currentUser.id])

    useEffect(() => {
        if(pins && pins[pinId]) {
            setTitle(pins[pinId].title)
            setDescription(pins[pinId].description)
            setImageUrl(pins[pinId].image_url)
        }
    }, [pins, pinId]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleDelete = () => {
        dispatch(thunkDeletePin(pinId));
        history.push('/home')
    }

    const handleAddToBoard = async (e) => {
        e.preventDefault();
        if (!selectedBoardId) {
            console.log('No board selected')
            return;
        }
        const res = await dispatch(thunkAddPinToBoard(selectedBoardId, pinId))
        if (res) {
            console.log('Pin added to board!')
        } else {
            console.log('Failed add pin to boar')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const pin = { title, description, image_url: imageUrl }
        await dispatch(thunkUpdatePin(pin, pinId))
        setIsEditing(false)
        history.push(`/pins/${pinId}`)
    }

    return (
        <div className="SinglePin-container">
            {pins && (
                <div className="SinglePin-content">
                    <img className="SinglePin-image" src={pins[pinId].image_url} alt={pins[pinId].title} />
                    <h1 className="SinglePin-title">{pins[pinId].title}</h1>
                    <p className="SinglePin-description">{pins[pinId].description}</p>
                    {currentUser.id === pins[pinId].user_id && (
                        <>
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={() => setIsEditing(true)}>Update</button>
                            {isEditing && (
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Title:
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Description:
                                        <input
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Image URL:
                                        <input
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </label>
                                    <button type="submit">Submit</button>
                                </form>
                            )}

                        </>
                    )}
                    <form onSubmit={handleAddToBoard}>
                                <label>
                                    Add to board:
                                    <select
                                        value={selectedBoardId}
                                        onChange={(e) => setSelectedBoardId(e.target.value)}>
                                        <option value="">Select a board...</option>
                                        {boards.map(board =>
                                            <option key={board.id} value={board.id}>{board.title}</option>
                                        )}
                                    </select>
                                </label>
                                <button type="submit">Add to Board</button>
                            </form>
                </div>
            )}
            {/* <h1>{console.log("SINGLE PIN", pins)}</h1> */}
        </div>
    );
}


export default SinglePin
