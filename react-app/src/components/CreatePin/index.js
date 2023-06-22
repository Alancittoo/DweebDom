import React from 'react';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreatePin, thunkGetPins } from "../../store/pin";
import { authenticate } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import { useDropzone } from 'react-dropzone';
import { useModal } from '../../context/Modal';
import WaitingModal from './WaitingModal';
import './CreatePin.css'

function NewPin() {
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState(null)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({});
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const { setModalContent, closeModal } = useModal()
    const [imageLoading, setImageLoading] = useState(false);

    const onDrop = (file) => {
        if (file.length > 0 && ['image/jpeg', 'image/png', 'image/gif'].includes(file[0].type)) {
            setImageUrl(file[0])
        } else {
            setErrors({ imageUrl: "Only PNG, JPG, JPEG, and GIF files are allowed." })
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png, image/gif'
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        const err = {}

        const formData = new FormData();
        formData.append("image_url", imageUrl)
        formData.append("title", title)
        formData.append("description", description)


        if (title.trim() === "") err.title = "Title is required"
        if (!imageUrl) err.imageUrl = "Image Url is required"

        if (!!Object.values(err).length || !imageUrl){
            setErrors(err)
        } else {
            // setImageLoading(true);
            setModalContent(<WaitingModal />)
            const newPin = await dispatch(thunkCreatePin(formData))
            dispatch(authenticate())
            if (newPin) {
                // setImageLoading(false)
                closeModal()
                history.push(`/pins/${newPin.id}`)
            } else {
                // setImageLoading(false);
                closeModal()
                // console.log('Waiting didnt work', newPin)
            }
        }
    }

    if (!user) {
        return <LoginFormModal />
    }

    return (
        <>
        {/* <WaitingModal isSending={imageLoading} /> */}
        <div className="Create-pin-container">
            <img className="Create-pin-image-placeholder"
                src={imageUrl ? URL.createObjectURL(imageUrl) : process.env.PUBLIC_URL + '/placeholder-image.gif' }
                onError={(e) => {e.target.onerror = null; e.target.src=process.env.PUBLIC_URL + '/BrokenImage.gif'}}
                alt={imageUrl}
            />
            <form className="Create-pin-form" onSubmit={handleSubmit}>
                <div className="Create-pin-header">
                    <h1 style={{color: 'white'}}>Create A New Pin !</h1>
                </div>
                <p style={{color: 'white'}} className="create-pin-errors">{errors.imageUrl}</p>

                <div {...getRootProps()} className='create-pin-dropzone-area'>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the goods here ...</p> :
                            <p style={{color:'white'}}>Drag 'n' drop your file here, or click to select a file</p>
                    }
                </div>

                <p style={{color: 'white'}} className="create-pin-errors">{errors.title}</p>

                <label className="create-pin-form-title">
                    <input
                        name="title"
                        value={title}
                        className="title-label"
                        id='title'
                        placeholder="Title"
                        onChange={(e) => {
                            // console.log(e.target.value)
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
                            // console.log(e.target.value)
                            setDescription(e.target.value)}}
                        style={{marginTop:'30px'}}
                    />
                </label>

                <div>
                    <button
                     onClick={() => {
                        if (!imageUrl || !title.trim() || Object.values(errors).length > 0) {
                            // alert("Sorry you have to put a title and an image.");
                        }
                    }}
                    style={{marginTop:'30px', marginLeft: '-2px'}}
                    className='Create-pin-submit-button'>
                        Create My Pin 🎉
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default NewPin
