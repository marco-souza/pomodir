import React from "react";
import LoggerFactory from "utils/logger";
import styles from "./styles";
import { connect } from "react-redux";
import NumberSelect from "../NumberSelect";

let Logger = new LoggerFactory("Counter");

const mapStateToProps = state => {
    console.log("mapStateToProps", state);
    return {
        min: state.min,
        sec: state.sec,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetCounter: () => {
            dispatch({ type: "RESET_COUNTDOWN" });
        },
        decrementCounter: () => {
            dispatch({ type: "DECREMENT_COUNTDOWN" });
        }
    };
};

class Component extends React.Component<Props> {

    async componentWillMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
        this.state = {
            running: false,
            min: this.props.min,
            sec: this.props.sec,
            total: this.props.min*60 + this.props.sec,
            percent: 0,
        };
    }

    resetData() {
        this.setState({ running: false, percent: 0 });
        clearInterval(this.counter);
        this.props.resetCounter();
    }

    start() {

        if (this.props.min + this.props.sec == 0) {
            alert("Finished");
        } else {

            this.setState({ running: true, total: this.props.min*60 + this.props.sec });
            this.counter = setInterval(() => {
                // Decrement time in store
                this.props.decrementCounter();
                // Increment Percent
                this.setState( { percent: (1 - (this.props.min*60 + this.props.sec)/this.state.total ) * 100 } );

                // Check if is the end
                if (this.props.min + this.props.sec == 0) {
                    this.resetData();
                    alert("Finished");
                }

            }, 1000);

        }
    }

    stop() {
        this.resetData();
        alert("Parado aí malucão!");
    }

    render() {
        return (
            <div className={styles.centeredWrap}>
                <div className={styles.counter}>

                    {/* Inputs */}
                    <div className={styles.inputs} >

                        {/* Minutes Select */}
                        <NumberSelect init={this.props.min} interval={5} max={60} type="SET_MIN_COUNTDOWN" editable={!this.state.running}/>
                        {/* Seconds Select */}
                        <NumberSelect init={this.props.sec} interval={10} max={59} type="SET_SEC_COUNTDOWN" editable={!this.state.running}/>

                    </div>

                    {/* Controls */}
                    <div className={styles.controls}>
                        {
                            this.state.running ?
                                <div onClick={this.stop}>   Stop </div>:
                                <div onClick={this.start}>  Start </div>
                        }
                    </div>

                    {/* Percent finished */}
                    <div className={styles.fill} style={{height: `${this.state.percent}%`}} ></div>
                </div>
            </div>
        );
    }
}

// Connect with redux
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);