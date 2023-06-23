////////////////////////                               ACTIONS CREATORS                   ////////////////////////////////////////////////
export const FOLLOW_USER = 'follows/FOLLOW_USER'
export const UNFOLLOW_USER = 'follows/UNFOLLOW_USER'
export const USER_FOLLOWING = 'follows/USER_FOLLOWING'
export const USERS_FOLLOWERS = 'follows/USERS_FOLLOWERS'


export const followUser = (userId) => ({
    type: FOLLOW_USER,
    userId
})

export const unfollowUser = (userId) => ({
    type: UNFOLLOW_USER,
    userId
})

export const setFollowing = (following) => ({
    type: USER_FOLLOWING,
    following
})

export const setFollowers = (followers) => ({
    type: USERS_FOLLOWERS,
    followers
})

////////////////////////                               THUNKS                   ////////////////////////////////////////////////

export const thunkFollowUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/follows/follow`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id: userId})
    })
    if (res.ok){
        // const data = await res.json()
        // console.log("FOLLOW USER THUNK SUCCESS", res)
        dispatch(followUser(userId))
        // return true
    }
    else {
        // console.log("FOLLOW USER THUNK FAILED", res)
        return false
    }
}

export const thunkUnfollowUser = (userId) => async(dispatch) => {
    const res = await fetch(`/api/follows/unfollow`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id: userId})
    })
    if (res.ok){
        // const data = await res.json()
        // console.log("UNFOLLOW USER THUNK SUCCESS", res)
        dispatch(unfollowUser(userId))
        // return true
    }
    else{
        // console.log("UNFOLLOW USER THUNK FAILED", res)
        return false
    }
}

export const thunkGetFollowing = (userId) => async(dispatch) => {
    const res = await fetch(`/api/follows/${userId}/following`)
    if (res.ok){
        const data = await res.json()
        dispatch(setFollowing(data))
        // return true
    }
    else{
        // console.log("GET FOLLOWING THUNK FAILED", res)
        return false
    }
}

export const thunkGetFollowers = (userId) => async(dispatch) => {
    const res = await fetch(`/api/follows/${userId}/followers`)
    if (res.ok){
        const data = await res.json()
        dispatch(setFollowers(data))
        // return true
    }
    else{
        // console.log("GET FOLLOWERS THUNK FAILED", res)
        return false
    }
}


////////////////////////                               FOLLOWS REDUCER                  ////////////////////////////////////////////////

const initialState = {
    following: [],
    followers: []
}

const followReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case FOLLOW_USER:
            newState = { ...state, following: [...state.following, action.userId] }
            return newState;
        case UNFOLLOW_USER:
            newState = { ...state, following: state.following.filter(id => id !== action.userId) }
            return newState;

        case USER_FOLLOWING:
            newState = { ...state, following: action.following }
            return newState;

        case USERS_FOLLOWERS:
            newState = { ...state, followers: action.followers }
            return newState;

        default:
            return state;
    }
};

export default followReducer;
