export default (state = { min: 25, sec: 0, startMin: 25, startSec: 0 }, action) => {
    switch (action.type) {

        case "DECREMENT_COUNTDOWN":
            return Object.assign({}, state, {
                // if decrease < 0, give 59
                sec: state.sec - 1 >= 0 ? state.sec - 1 : 59,
                // if decrease < 0, give min - 1 if
                min: state.sec - 1 >= 0 ?
                    state.min :
                    state.min - 1 > 0 ?
                        state.min - 1 : 0,
            });

        case "RESET_COUNTDOWN":
            return Object.assign({}, state, {
                sec: state.startSec,
                min: state.startMin
            });

        case "SET_MIN_COUNTDOWN":
            return Object.assign({}, state, {
                startMin: action.value,
                min: action.value
            });

        case "SET_SEC_COUNTDOWN":
            return Object.assign({}, state, {
                startSec: action.value,
                sec: action.value
            });
        default:
            return state;
    }
};