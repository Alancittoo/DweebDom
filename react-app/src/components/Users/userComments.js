import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Users.css'
import { thunkGetSinglePin } from '../../store/pin';
import { useEffect, useState } from 'react';


function UserComments() {
    const comments = useSelector(state => Object.values(state.comments.comments));
    // console.log(comments, "COMMENTS")
    const pins = useSelector(state => state.pins.pins);
    const dispatch = useDispatch()
    const [fetchedPinIds, setFetchedPinIds] = useState(new Set())

    useEffect(() => {
        comments.forEach(comment => {
            if (!fetchedPinIds.has(comment.pin_id)) {
                dispatch(thunkGetSinglePin(comment.pin_id));
                // console.log(fetchedPinIds)
                setFetchedPinIds(prev => new Set(prev).add(comment.pin_id));
                // console.log(fetchedPinIds)
            }
        });
    }, [comments, dispatch]);

    return (
        <div>
            {comments && comments.map(comment => {
                const pin = pins[comment.pin_id];
                // console.log(pin, "PINS")
                return (
                    <div key={comment.id}>
                        <NavLink to={`/pins/${comment.pin_id}`} className='comments-details' style={{color:'White'}}>
                            <h2>{comment.comment}</h2>
                            {pin && <p>Pin: {pin.title}</p>}
                        </NavLink>
                    </div>
                );
            })}
        </div>
    );
}

export default UserComments;
