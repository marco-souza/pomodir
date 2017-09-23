export default dispatch => {
    return {
        resetCounter: () => dispatch({ type: "RESET_COUNTDOWN" }),
        setResetValue: () => dispatch({ type: "SET_RESET_VALUE" }),
        tickCounter: () => dispatch({ type: "TICK_COUNTDOWN" }),
        setCounter: (value, type) => dispatch({
            type: type === "SECOND"
                ? "SET_SECOND_VALUE"
                : "SET_MINUTE_VALUE",
            value
        }),
    }
}