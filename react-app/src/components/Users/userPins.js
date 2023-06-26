import { NavLink } from "react-router-dom";
import PinImage from "../AllPins";


function UserPins({ pins }) {


    return (
        <div className="HomePage-container" >
            <div className="HomePage-image-container">
                {pins.map(pin => (
                    <div key={pin.pinId} className="HomePage-pin-container" style={{paddingTop: '30'}}>
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

export default UserPins
