import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreatePin, thunkGetPins } from "../../store/pin";
import { authenticate } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import './CreatePin.css'

function NewPin() {
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = async(e) => {
        e.preventDefault();
        const err = {}
        const pin = {title, description, image_url: imageUrl}
        console.log('Pin Object 2:', pin);

        if (title.trim() === "") err.title = "Title is required";
        if (imageUrl.trim() === "") err.imageUrl = "Image Url is required";

        if (!!Object.values(err).length){
            setErrors(err)
        } else {
            console.log('Pin Object:', pin);
            const newPin = await dispatch(thunkCreatePin(pin))
            console.log('New Pin:', newPin)
            dispatch(authenticate())
            // dispatch(thunkGetPins)
            if (newPin) {
                history.push(`/pins/${newPin.id}`)
            } else {
                console.log('WAiting didnt work')
            }
        }
    }

    if (!user) {
        return <LoginFormModal />
    }

    return (
        <div className="Create-pin-container">
            <img className="Create-pin-image-placeholder"
                src={imageUrl ? imageUrl : process.env.PUBLIC_URL + '/placeholder-image.gif' }
                onError={(e) => {e.target.onerror = null; e.target.src=process.env.PUBLIC_URL + '/BrokenImage.gif'}}
                alt={imageUrl}
            />
            <form className="Create-pin-form" onSubmit={handleSubmit}>
                <div className="Create-pin-header">
                    <h1 style={{color: 'white'}}>Create A New Pin !</h1>
                </div>
                <p style={{color: 'white'}} className="create-pin-errors">{errors.imageUrl}</p>

                <label className="create-pin-form-image">
                    <input

                        name="imageUrl"
                        value={imageUrl}
                        className="imageUrl-label"
                        id='imageUrl'
                        placeholder="ImageUrl"
                        onChange={(e) => {
                            console.log(e.target.value)
                            setImageUrl(e.target.value)}}
                    />
                </label>
                <p style={{color: 'white'}} className="create-pin-errors">{errors.title}</p>

                <label className="create-pin-form-title">
                    <input
                        name="title"
                        value={title}
                        className="title-label"
                        id='title'
                        placeholder="Title"
                        onChange={(e) => {
                            console.log(e.target.value)
                            setTitle(e.target.value)}}
                    />
                </label>
                <label className="create-pin-form-description">
                    <input
                        name="description"
                        value={description}
                        className="description-label"
                        id='description'
                        placeholder="Description"
                        onChange={(e) => {
                            console.log(e.target.value)
                            setDescription(e.target.value)}}
                        style={{marginTop:'30px'}}
                    />
                    {/* <p className="create-pin-errors">{errors.title}</p> */}
                </label>
                {/* <hr/> */}
                <div>
                    <button  style={{marginTop:'30px', marginLeft: '-2px'}} className='Create-pin-submit-button' >Create My Pin 🎉</button>
                </div>
            </form>
        </div>
    )

}


export default NewPin
