import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Followers({ followers }) {
    return (
        <div>
            <h2 style={{color:'White'}}>Followers</h2>
            {followers.map(user => (
                <div key={user.id}>
                    <Link style={{color:'White'}} to={`/user/${user.id}`}>{user.username}</Link>
                </div>
            ))}
        </div>
    )
}

export default Followers;
