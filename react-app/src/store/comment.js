////////////////////////                               ACTIONS CREATORS                   ////////////////////////////////////////////////
export const GET_USER_COMMENTS = 'comments/GET_USER_COMMENTS'
export const CREATE_COMMENT = 'comments/CREATE_COMMENT'
export const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
export const GET_PIN_COMMENTS = 'comments/GET_PIN_COMMENTS'
export const DELETE_COMMENT = 'comments/DELETE_COMMENT'

export const getUserComments = (comments) => ({
    type: GET_USER_COMMENTS,
    comments
})


export const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})


export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})


export const getPinComments = (comments) => ({
    type: GET_PIN_COMMENTS,
    comments
})


export const deleteComment = (comment_id) => ({
    type: DELETE_COMMENT,
    comment_id
})

////////////////////////                               THUNKS                   ////////////////////////////////////////////////

export const thunkGetUserComments = () => async (dispatch) => {
    const res = await fetch(`/api/comments/userComments`)
    if (res.ok){
        const data = await res.json()
        dispatch(getUserComments(data.UsersComments))
        return data
    }
    else {
        // console.log("GET USER COMMENTS THUNK FAILED", res)
        return false
    }
}

export const thunkCreateComment = (comment) => async(dispatch) => {
    const res = await fetch(`/api/comments/newComment`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
    if (res.ok){
        const data = await res.json()
        dispatch(createComment(data))
        return data
    }
    else{
        // console.log("CREATE COMMENT THUNK FAILED", res)
        return false
    }
}

export const thunkUpdateComment = (comment, comment_id) => async(dispatch) => {
    const res = await fetch(`/api/comments/update/${comment_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
    if (res.ok){
        const data = await res.json()
        dispatch(updateComment(data.comment))
        // console.log("UPDATE COMMENT THUNK SUCCESS", res)
        return data
    }
    else {
        // console.log("UPDATE COMMENT THUNK FAILED", res)
        return false
    }
}

export const thunkDeleteComment = (comment_id) => async(dispatch) => {
    const res = await fetch(`/api/comments/delete/${comment_id}`,{
        method: "DELETE"
    })
    if (res.ok){
        dispatch(deleteComment(comment_id))
        return res
    }
    else {
        // console.log("DELETE COMMENT THUNK FAILED", res)
        return false
    }
}

export const thunkGetPinComments = (pin_id) => async(dispatch) => {
    const res = await fetch(`/api/comments/pin/${pin_id}`)
    if (res.ok){
        const data = await res.json()
        dispatch(getPinComments(data.pinComments))
        return data
    }
    else{
        // console.log("GET PIN COMMENTS THUNK FAILED", res)
        return false
    }
}


////////////////////////                               COMMENTS REDUCER                  ////////////////////////////////////////////////

const initialState = {
    comments: {},
    currentComment: {}
}

const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_USER_COMMENTS:
            newState = { ...state, comments: {} }
            action.comments.forEach(comment => {
                newState.comments[comment.id] = comment
            });
            return newState;

        case UPDATE_COMMENT:
            newState = { ...state, comments: { ...state.comments } }
            newState.comments[action.comment.id] = action.comment
            return newState
        case DELETE_COMMENT:
            newState = { ...state, comments: { ...state.comments } }
            delete newState.comments[action.comment_id]
            return newState
        case GET_PIN_COMMENTS:
            newState = { ...state, comments: {} }
            action.comments.forEach(comment => {
                newState.comments[comment.id] = comment
            });
            return newState;
        default:
            return state
    }
};


export default commentReducer
