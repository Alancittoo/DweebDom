import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetPins, thunkGetSinglePin, thunkUpdatePin } from "../store/pin";
import { useHistory, useParams } from "react-router-dom";
import { thunkDeletePin } from "../store/pin";
import './SinglePin.css'



function SinglePin () {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const pins = useSelector(state => state.pins.pins)
    const {pinId} = useParams()
    const currentUser = useSelector(state => state.session.user);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        dispatch(thunkGetPins())
        dispatch(thunkGetSinglePin(pinId))
        .then(() => setIsLoading(false))
    }, [dispatch, pinId])

    useEffect(() => {
        if(pins && pins[pinId]) {
            setTitle(pins[pinId].title);
            setDescription(pins[pinId].description);
            setImageUrl(pins[pinId].image_url);
        }
    }, [pins, pinId]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleDelete = () => {
        dispatch(thunkDeletePin(pinId));
        history.push('/home')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pin = { title, description, image_url: imageUrl }
        await dispatch(thunkUpdatePin(pin, pinId));
        setIsEditing(false);
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
                </div>
            )}
            {/* <h1>{console.log("SINGLE PIN", pins)}</h1> */}
        </div>
    );
}


export default SinglePin
