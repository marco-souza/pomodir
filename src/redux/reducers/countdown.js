// Define Initial State
const initialState = {
    min: 25,
    sec: 0,
    startMin: 25,
    startSec: 0
}

export default (state = initialState, action) => {
    switch (action.type) {

        // Timer's tick
        case "TICK_COUNTDOWN":
            return Object.assign({}, state, {
                // if decrease < 0, give 59
                sec: state.sec - 1 >= 0 && state.min > 0 // -> last second and has minutes?
                    ? state.sec - 1
                    : 59,

                // if decrease < 0, give min - 1 if
                min: state.sec - 1 <= 0 // -> last second?
                    ? state.min - 1 > 0 // -> last minute?
                        ? state.min - 1
                        : 0
                    : state.min })

        // Reset
        case "RESET_COUNTDOWN":
            return Object.assign({}, state, {
                sec: state.startSec,
                min: state.startMin })

        // Set a value when reset
        case "SET_RESET_VALUE":
            return Object.assign({}, state, {
                startSec: action.sec,
                startMin: action.min })

        // Set Minute Value
        case "SET_MINUTE_VALUE":
            return Object.assign({}, state, {
                min: action.value > 0
                    ? action.value
                    : 0 })

        // Set Minute Value
        case "SET_SECOND_VALUE":
            return Object.assign({}, state, {
                sec: action.value > 0
                    ? action.value
                    : 0 })

        // Return state without change
        default:
            return state
    }
}