import React from "react";
import LoggerFactory from "utils/logger";
import styles from "./styles";
import NumberSelect from "../NumberSelect";

type Props = {
    min: Number,
    sec: Number,
}

let Logger = new LoggerFactory("Counter");

export default class Component extends React.Component<Props> {

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

    start() {
        this.setState({ running: true, total: this.state.min*60 + this.state.sec });

        this.counter = setInterval(() => {
            const dec = this.state.sec - 1,
                nextState = {
                    // if decrease < 0, give 59
                    sec: dec >= 0 ? dec : 59,
                    // if decrease < 0, give min - 1 if
                    min: dec >= 0 ?
                        this.state.min :
                        this.state.min - 1 > 0 ?
                            this.state.min - 1 : 0,
                };
            nextState.percent = ( 1 - (nextState.min*60 + nextState.sec)/this.state.total ) * 100 ;

            this.setState(nextState);
            console.log(nextState);

            if (nextState.min + nextState.sec == 0) {
                clearInterval(this.counter);
                alert("Finished");
            }


        }, 1000);
    }

    stop() {
        this.setState({
            running: false,
            min: 25,
            sec: 0,
            total: this.props.min*60 + this.props.sec,
            percent: 0
        });

        clearInterval(this.counter);
        alert("Acabou malucão");
    }

    render() {
        return (
            <div className={styles.centeredWrap}>
                <div className={styles.counter}>

                    {/* Inputs */}
                    <div className={styles.inputs} >

                        {/* Minutes Select */}
                        <NumberSelect init={this.state.min} interval={5} max={60} editable={!this.state.running}/>
                        {/* Seconds Select */}
                        <NumberSelect init={this.state.sec} interval={10} max={59} editable={!this.state.running}/>

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