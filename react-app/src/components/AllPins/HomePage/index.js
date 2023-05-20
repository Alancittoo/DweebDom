import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { thunkGetPins, thunkGetSinglePin } from "../../../store/pin"
import OpenModalButton from "../../OpenModalButton";
import OpenModalPinDetail from "../../SinglePinDetail";
import PinImage from "..";
import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id && state.session.user.id)
    const [profileMenu, setProfileMenu] = useState(false);
    const [currId, setCurrId] = useState(null);
    // console.log('TEST', Object.values(useSelector(state => state.pins)))
    console.log('SESSIOn', useSelector(state => state))

    const pins = Object.values(useSelector(state => state.pins.pins))

    useEffect(() => {
        dispatch(thunkGetPins())
    }, [dispatch])


    return (
        <div className="HomePage-container">
            <div className="HomePage-image-container">
                {pins.map(pin => (
                    <div key={pin.pinId} className="HomePage-pin-container">
                        <NavLink to={`/pins/${pin.id}`}>
                            <img classname='HomePage-pin-image' src={pin.image_url} alt={pin.title} />
                            <PinImage pin={pin} />
                        </NavLink>

                        {/* <h3 className="HomePage-pin-title">{pin.title}</h3>
                        <p className="HomePage-pin-desc">{pin.description}</p> */}

                    </div>

                ))}
            </div>
        </div>
    );
}

export default HomePage;
