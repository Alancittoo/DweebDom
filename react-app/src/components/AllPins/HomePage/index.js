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

    const pins = Object.values(useSelector(state => state.pins.pins)) || []

    useEffect(() => {
        dispatch(thunkGetPins())
    }, [dispatch])


    function shufflePins(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    // const newest = pins[pins.length -5]
    const newest = pins[pins.length - 1]
    const otherPins = pins.length > 0 ? pins.slice(0, pins.length - 1) : []

    shufflePins(otherPins);

    return (
        <div className="HomePage-container">
            <div className="HomePage-image-container">
                <div className="HomePage-pin-container">
                    <NavLink to={`/pins/${newest?.id}`}>
                        <img className='HomePage-pin-image' src={newest?.image_url} alt={newest?.title} />
                        <PinImage pin={newest} />
                    </NavLink>
                </div>
                {otherPins.map(pin => (
                    <div key={pin.pinId} className="HomePage-pin-container">
                        <NavLink to={`/pins/${pin.id}`}>
                            <img className='HomePage-pin-image' src={pin.image_url} alt={pin.title} />
                            <PinImage pin={pin} />
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
