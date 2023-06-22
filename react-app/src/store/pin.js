////////////////////////                               ACTIONS CREATORS                   ////////////////////////////////////////////////
export const GET_PINS = 'pins/GET_PINS'
export const GET_SINGLE_PIN = 'pins/GET_SINGLE_PIN'
export const CREATE_PIN = 'pins/CREATE_PIN'
export const UPDATE_PIN = 'pins/UPDATE_PIN'
export const DELETE_PIN = 'pins/DELETE_PIN'

export const getPins = (pins) => ({
    type: GET_PINS,
    pins
})


export const getSinglePin = (pin_id) => ({
    type: GET_SINGLE_PIN,
    pin_id
})


export const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
})


export const updatePin = (pin) => ({
    type: UPDATE_PIN,
    pin
})


export const deletePin= (pin_id) => ({
    type: DELETE_PIN,
    pin_id
})

////////////////////////                               THUNKS                   ////////////////////////////////////////////////

export const thunkGetPins = () => async (dispatch) => {
    const res = await fetch("/api/pins/allPins")
    if (res.ok){
        const data = await res.json()
        // console.log('THUNK GET ALL PINS', data)
        dispatch(getPins(data.Pins))
        return data
    }
    else{
        console.log("GET ALL PINS THUNK FAILED", res)
        return false
    }
}


export const thunkGetSinglePin = (pin_id) => async(dispatch) => {
    const res = await fetch(`/api/pins/singlePin/${pin_id}`)
    if (res.ok){
        const data = await res.json()
        dispatch(getSinglePin(data))
        return data
    }
    else{
        console.log("GET PIN THUNK FAILED", res)
        return false
    }
}


export const thunkCreatePin = (pin) => async(dispatch) => {
    const res = await fetch(`/api/pins/newPin`,{
        method: "POST",
        body: (pin)
    })
    if (res.ok){
        const data = await res.json()
        dispatch(createPin(data))
        return data
    }
    else{
        console.log("CREATE PIN THUNK FAILED", res)
        return false
    }
}


export const thunkUpdatePin = (pin, pin_id) => async(dispatch) => {
    const res = await fetch(`/api/pins/update/${pin_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pin)
    })
    if (res.ok){
        const data = await res.json()
        dispatch(updatePin(data))
        return data
    }
    else {
        console.log("UPDATE PIN THUNK FAILED", res)
        return false
    }
}


export const thunkDeletePin = (pin_id) => async(dispatch) => {
    const res = await fetch(`/api/pins/delete/${pin_id}`,{
        method: "DELETE"
    })
    if (res.ok){
        dispatch(deletePin(pin_id))
        return res
    }
    else {
        console.log("DELETE PIN THUNK FAILED", res)
        return false
    }
}


////////////////////////                               PIN REDUCER                  ////////////////////////////////////////////////


const initialState = {
    pins: {},
    currentPin: {}
  }

  const pinReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
      case GET_PINS:
        newState = { ...state, pins: {} }
        action.pins.forEach(pin => {
          newState.pins[pin.id] = pin
        });
        return newState;
      case GET_SINGLE_PIN:
        newState = { ...state, currentPin: state.pins[action.pin_id] }
        return newState
      case UPDATE_PIN:
        newState = { ...state, pins: { ...state.pins } }
        newState.pins[action.pin.id] = action.pin
        return newState
      case DELETE_PIN:
        newState = { ...state, pins: { ...state.pins } }
        delete newState.pins[action.pin_id]
        return newState
      default:
        return state
    }
  };


export default pinReducer
