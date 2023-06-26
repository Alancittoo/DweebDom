import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetPins } from "../../store/pin";
import { thunkGetBoards } from "../../store/board";
import { thunkGetUserComments } from "../../store/comment";
import { thunkGetFollowing, thunkGetFollowers, thunkFollowUser, thunkUnfollowUser } from '../../store/follow';
import AllBoards from "../AllBoards";
// import HomePage from "../AllPins/HomePage";
import UserPins from "./userPins";
import { thunkGetUserById } from "../../store/session";
import UserBoards from "./userBoards";
import UserComments from "./userComments";
import Followers from "./followers";
import Following from "./following";

function UserProfile(){
    const dispatch = useDispatch()
    const { userId } = useParams();
    // console.log('userId', userId);
    const currentUser = useSelector(state => state.session.user)
    // console.log('currentUser', currentUser)
    const following = useSelector(state => state.follows.following);
    // console.log('following', following)
    const pins = useSelector(state => state.pins.pins);
    const userPins = Object.values(pins).filter(pin => pin.user_id === Number(userId));
    const profileUser = useSelector(state => state.session.profileUser);
    // console.log(profileUser, 'PROFILEUSER')
    const [activeTab, setActiveTab] = useState('pins');
    const followingSet = new Set(following.map(user => user.id))
    const followers = useSelector(state => state.follows.followers);

    useEffect(() => {
        dispatch(thunkGetUserById(userId))
        dispatch(thunkGetPins(userId));
        dispatch(thunkGetBoards(userId));
        dispatch(thunkGetUserComments(userId));
        dispatch(thunkGetFollowing(currentUser.id));
        dispatch(thunkGetFollowers(currentUser.id))
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
                return <UserComments userId={userId}/>; // Replace, fix endpoint to work with this
            case 'boards':
                return <UserBoards/>; // 1/2 DONE
            case 'following': // New tab for following
                return <Following following={following}/>;
            case 'followers': // New tab for followers
                return <Followers followers={followers}/>;
            default:
                return null;
        }
    }

    useEffect(() => {
        setActiveTab('pins') // change so it resets tab on user change, rn not working
    }, [userId]);

    const isFollowing = followingSet.has(Number(userId))

    return (
        <div className="users-profile-interaction">
            <h1 style={{color: "white"}}>Welcome To {profileUser && profileUser.username}'s Profile!</h1>

            <div className="follows-portion" >
            {currentUser.id !== Number(userId) && (
                isFollowing ?
                <button className="user-Buttons-tabs" style={{marginLeft: "50px"}} onClick={handleUnfollow}>Unfollow</button> :
                <button className="user-Buttons-tabs" style={{marginLeft: "50px"}} onClick={handleFollow}>Follow</button>

            )}
                <div style={{marginTop: "15px"}}>
                    <button className="user-Buttons-tabs" onClick={() => setActiveTab('following')}>Following</button>
                    <button className="user-Buttons-tabs" onClick={() => setActiveTab('followers')}>Followers</button>
                </div>
            </div>

            <div className="interaction-portion" >
                <button className="user-Buttons-tabs" onClick={() => setActiveTab('pins')}>Pins</button>
                <button className="user-Buttons-tabs" onClick={() => setActiveTab('comments')}>Comments</button>
                <button className="user-Buttons-tabs" onClick={() => setActiveTab('boards')}>Boards</button>
            </div>

            {renderTabContent()}
        </div>
    );
}

export default UserProfile;
