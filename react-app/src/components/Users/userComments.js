import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserComments() {
    const comments = useSelector(state => Object.values(state.comments.comments));
    console.log(comments, "COMMENTS")

    return (
        <div>
            {comments && comments.map(comment => (
                <div key={comment.id}>
                    {/* <p>{comment.comment}</p> */}
                    <Link to={`/pins/${comment.pin_id}`}>{comment.comment}</Link>
                </div>
            ))}
        </div>
    );
}

export default UserComments;
