import React from "react"
import LoggerFactory from "utils/logger"
import styles from "./styles"
import { connect } from "react-redux"
import NumberSelect from "../NumberSelect"
import actionCreator from "actions/countdown"
import _ from "lodash"

let Logger = new LoggerFactory("Counter")

const mapStateToProps = state =>{
    console.log(_.pick(state, ["min", "sec"]))
    return _.pick(state, ["min", "sec"])
}
const mapDispatchToProps = dispatch =>
    _.pick(actionCreator(dispatch), ["resetCounter", "tickCounter"])

class Component extends React.Component {

    async componentWillMount() {
        let logger = Logger.create("componentDidMount")
        logger.info("enter")
        this.state = {
            running: false,
            total: this.props.min*60 + this.props.sec,
            percent: 0,
        }
    }

    /**
     * Reset component state and store
     *
     * @memberof Component
     */
    resetData() {
        this.setState({ running: false, percent: 0 }) // -> reset
        clearInterval(this.counter) // -> stop counter
        this.props.resetCounter() // -> reset counter to default
    }

    /**
     * Start the countdown
     *
     * @memberof Component
     */
    start() {
        this.setState({ running: true, total: this.props.min*60 + this.props.sec })

        // Save counter to stop
        this.counter = setInterval(() => {
            if (this.props.min + this.props.sec > 0) {
                // Decrement time in store
                this.props.tickCounter()
                // Increment Percent
                this.setState( { percent: (1 - (this.props.min*60 + this.props.sec)/this.state.total ) * 100 } )
            } else {
                this.resetData()
                alert("Finished")
            }
        }, 1000)
    }

    /**
     * Stop the countdown and reset
     *
     * @memberof Component
     */
    stop() {
        this.resetData()
    }

    render() {
        return (
            <div className={styles.centeredWrap}>
                <div className={styles.counter}>

                    {/* Inputs */}
                    <div className={styles.inputs} >

                        {/* Minutes Select */}
                        <NumberSelect
                            counterValue={this.props.min}
                            interval={5}
                            max={60}
                            type="MINUTE"
                            editable={!this.state.running}/>

                        {/* Seconds Select */}
                        <NumberSelect
                            counterValue={this.props.sec}
                            interval={10}
                            max={59}
                            type="SECOND"/>

                    </div>

                    {/* Controls */}
                    <div className={styles.controls}>
                        { this.state.running
                            ? <div onClick={this.stop}>   Stop </div>
                            : <div onClick={this.start}>  Start </div> }
                    </div>

                    {/* Percent finished */}
                    <div
                        className={styles.fill}
                        style={{height: `${this.state.percent}%`}} />
                </div>
            </div>
        )
    }
}

// Connect with redux
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)