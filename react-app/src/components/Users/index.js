import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetPins } from "../../store/pin";
import { thunkGetBoards } from "../../store/board";
import { thunkGetUserComments } from "../../store/comment";
import { thunkGetFollowing, thunkFollowUser, thunkUnfollowUser } from '../../store/follow';
import AllBoards from "../AllBoards";
// import HomePage from "../AllPins/HomePage";
import UserPins from "./userPins";
import { thunkGetUserById } from "../../store/session";
import UserBoards from "./userBoards";
import UserComments from "./userComments";

function UserProfile(){
    const dispatch = useDispatch()
    const { userId } = useParams();
    console.log('userId', userId);
    const currentUser = useSelector(state => state.session.user)
    console.log('currentUser', currentUser)
    const following = useSelector(state => state.follows.following);
    console.log('following', following)
    const pins = useSelector(state => state.pins.pins);
    const userPins = Object.values(pins).filter(pin => pin.user_id === Number(userId));
    const profileUser = useSelector(state => state.session.profileUser);
    console.log(profileUser, 'PROFILEUSER')
    const [activeTab, setActiveTab] = useState('pins');
    const followingSet = new Set(following.map(user => user.id))

    useEffect(() => {
        dispatch(thunkGetUserById(userId))
        dispatch(thunkGetPins(userId));
        dispatch(thunkGetBoards(userId));
        dispatch(thunkGetUserComments(userId));
        dispatch(thunkGetFollowing(currentUser.id));
    }, [dispatch, userId, currentUser.id]);

    const handleFollow = () => {
        dispatch(thunkFollowUser(userId));
        dispatch(thunkGetFollowing(currentUser.id))
        dispatch(thunkGetUserById(userId))

    }

    const handleUnfollow = () => {
        dispatch(thunkUnfollowUser(userId));
        dispatch(thunkGetFollowing(currentUser.id))
        dispatch(thunkGetUserById(userId))

    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'pins':
                return <UserPins pins={userPins}/>; //DONE
            case 'comments':
                return <UserComments/>; // Replace
            case 'boards':
                return <UserBoards/>; // 1/2 DONE
            default:
                return null;
        }
    }

    const isFollowing = followingSet.has(Number(userId))

    return (
        <div>
            <h1 style={{color: "white"}}>{profileUser && profileUser.username}</h1>

            {currentUser.id !== Number(userId) && (
                isFollowing ?
                <button onClick={handleUnfollow}>Unfollow</button> :
                <button onClick={handleFollow}>Follow</button>
            )}

            <div>
                <button onClick={() => setActiveTab('pins')}>Pins</button>
                <button onClick={() => setActiveTab('comments')}>Comments</button>
                <button onClick={() => setActiveTab('boards')}>Boards</button>
            </div>

            {renderTabContent()}
        </div>
    );
}

export default UserProfile;
