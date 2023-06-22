////////////////////////                               ACTIONS CREATORS                   ////////////////////////////////////////////////
export const GET_BOARDS = 'boards/GET_BOARDS'
export const GET_SINGLE_BOARD = 'boards/GET_SINGLE_BOARD'
export const CREATE_BOARD = 'boards/CREATE_BOARD'
export const UPDATE_BOARD = 'boards/UPDATE_BOARD'
export const DELETE_BOARD = 'boards/DELETE_BOARD'

export const getBoards = (boards) => ({
    type: GET_BOARDS,
    boards
})


export const getSingleBoard = (board_id) => ({
    type: GET_SINGLE_BOARD,
    board_id
})


export const createBoard = (board) => ({
    type: CREATE_BOARD,
    board
})


export const updateBoard = (board_id) => ({
    type: UPDATE_BOARD,
    board_id
})


export const deleteBoard = (board_id) => ({
    type: DELETE_BOARD,
    board_id
})

////////////////////////                               THUNKS                   ////////////////////////////////////////////////

export const thunkGetBoards = (user_id) => async (dispatch) => {
    const res = await fetch(`/api/boards/allBoards/${user_id}`)
    if (res.ok){
        const data = await res.json()
        const boardsArray = Array.isArray(data) ? data : [data] // make sure Array for comp to work
        // console.log('BOARDSARRAY IN THUNK',boardsArray)
        dispatch(getBoards(boardsArray))
        return boardsArray
    }
    else {
        console.log("GET BOARDS THUNK FAILED", res)
        return false
    }
}


export const thunkGetSingleBoard = (board_id) => async (dispatch) => {
    const res = await fetch(`/api/boards/${board_id}`)
    if (res.ok){
        const data = await res.json()
        // console.log('SINGLEBOARDTHUNK', data)
        dispatch(getSingleBoard(data))
        return data
    }
    else {
        console.log("GET SINGLE BOARD THUNK FAILED", res)
        return false
    }
}


export const thunkCreateBoard = (board) => async(dispatch) => {
    const res = await fetch(`/api/boards/createBoard`, {
        method: "POST",
        body: board
    })
    if (res.ok){
        const data = await res.json()
        dispatch(createBoard(board))
        return data
    }
    else {
        console.log("CREATE BOARD THUNK FAILED", res)
        return false
    }
}


export const thunkUpdateBoard = (board, board_id) => async (dispatch) => {
    const res = await fetch(`/api/boards/${board_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(board)
    })
    if (res.ok) {
        const data = await res.json()
        return data
    }
    else {
        console.log("UPDATE BOARD THUNK FAILED", res)
        return false
    }
}


export const thunkDeleteBoard = (board_id) => async (dispatch) => {
    const res = await fetch(`/api/boards/delete/${board_id}`, {
        method: "DELETE"
    })
    if (res.ok){
        dispatch(deleteBoard(board_id))
        return res
    }
    else {
        console.log("DELETE BOARD THUNK FAILED", res)
        return false
    }
}

export const thunkAddPinToBoard = (board_id, pin_id) => async (dispatch) => {
    const res = await fetch (`/api/boards/${board_id}/pins/${pin_id}`, {
        method: 'POST'
    })
    if (res.ok){
        const data = await res.json()
        dispatch(getSingleBoard(data))
        return data
    } else {
        console.log("ADD PIN TO BOARD THUNK FAILED", res)
        return false
    }
}

export const thunkDeletePinFromBoard = (board_id, pin_id) => async (dispatch) => {
    const res = await fetch (`/api/boards/${board_id}/pins/${pin_id}`, {
        method: 'DELETE'
    })
    if (res.ok){
        const data = await res.json()
        dispatch(getSingleBoard(data))
        return data
    } else {
        console.log("DELETE PIN FROM BOARD THUNK FAILED", res)
        return false
    }
}


////////////////////////                               PIN REDUCER                  ////////////////////////////////////////////////


const initialState = {
    allBoards: {},
    currentBoard: {}
}

const boardReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_BOARDS:
            newState = { ...state, allBoards: [...action.boards] };
            return newState;
        case GET_SINGLE_BOARD:
            newState = { ...state, currentBoard: {...state, currentBoard: {...action.board_id}} };
            // console.log('SINGLEBOARDREDUCER',newState)
            return newState;

        case DELETE_BOARD:
            newState = { ...state, allBoards: {...state.allBoards} };
            delete newState.allBoards[action.board_id];
            return newState;
        default:
            return state;
    }
}

export default boardReducer;
