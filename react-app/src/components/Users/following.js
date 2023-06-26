import { Link } from "react-router-dom";

function Following({ following }) {
    return (
        <div>
            <h2 style={{color:'White'}} >Following</h2>
            {following.map(user => (
                <div key={user.id}>
                    <Link style={{color:'White'}} to={`/user/${user.id}`}>{user.username}</Link>
                </div>
            ))}
        </div>
    )
}

export default Following;
