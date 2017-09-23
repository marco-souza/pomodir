import React from "react"
import { connect } from "react-redux"
import LoggerFactory from "utils/logger"
import styles from "./styles"
import actionCreator from "actions/countdown"
import _ from "lodash"

type Props = {
    counterValue: Number,
    interval: Number,
    type: String,
    max: ?Number,
    min: ?Number,
    editable: ?Boolean,
}

let Logger = new LoggerFactory("NumberSelect")

// Use Action creator for countdown state controller
const mapDispatchToProps = dispatch =>
    _.pick(actionCreator(dispatch), ["setCounter"])

class Component extends React.Component<Props> {

    static defaultProps: Props = {
        counterValue: 0,
        interval: 1,
        min: 0,
        max: 100,
        editable: false
    }

    componentWillMount() {
        let logger = Logger.create("componentDidMount")
        console.log("enter", this.props)
    }

    render() {
        return (
            <div className={styles.main} >

                {/* Positive button */}
                <div
                    className={
                        this.props.editable
                            ? styles.button
                            : styles.buttonDisabled }

                    onClick={() => {
                        let result = this.props.counterValue + this.props.interval
                        this.props.setCounter(
                            result < this.props.max
                                ? result
                                : this.props.max, this.props.type ) }}
                >+</div>

                {/* Counter view */}
                <div>
                    { ("" + this.props.counterValue).length > 1
                        ? "" + this.props.counterValue
                        : "0" + this.props.counterValue }
                </div>

                {/* Negative button */}
                <div
                    className={
                        this.props.editable
                            ? styles.button
                            : styles.buttonDisabled }

                    onClick={() => {
                        let result = this.props.counterValue - this.props.interval
                        this.props.setCounter(
                            result > this.props.min
                                ? result
                                : this.props.min , this.props.type )
                    }}
                >-</div>
            </div>
        )
    }
}

// Connect with redux
export default connect(
    null,
    mapDispatchToProps
)(Component)