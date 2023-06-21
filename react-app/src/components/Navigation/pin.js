import { useDispatch, useSelector, } from 'react-redux';




function Pin({ pin }) {

const pins = useSelector(state => state.pins.pins);

    return (
        <div>
            <h2>{pin.title}</h2>
            <img src={pin.image_url} alt={pin.title} />
            <p>{pin.description}</p>
        </div>
    );
}

export default Pin
