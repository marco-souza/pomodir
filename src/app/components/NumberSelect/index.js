import React from "react";
import LoggerFactory from "utils/logger";
import styles from "./styles";

type Props = {
    init: Number,
    interval: Number,
    max: ?Number,
    mix: ?Number,
}

let Logger = new LoggerFactory("NumberSelect");

export default class Component extends React.Component<Props> {

    static defaultProps: Props = {
        init: 0,
        interval: 1,
        min: 0,
        max: 100
    }

    state = {
        currentValue: 0,
        interval: 0,
    }

    componentWillMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");

        this.state = {
            currentValue: this.props.init,
            interval: this.props.interval
        };
    }

    render() {
        return (
            <div className={styles.main} >
                <div
                    className={styles.button}
                    onClick={() => {
                        const result = this.state.currentValue + this.state.interval;
                        this.setState({
                            currentValue: result <= this.props.max ? result : this.props.max
                        });
                    }}
                >+</div>
                <div>
                    {
                        ("" + this.state.currentValue).length > 1 ?
                            "" + this.state.currentValue : "0" + this.state.currentValue
                    }
                </div>
                <div
                    className={styles.button}
                    onClick={() => {
                        const result = this.state.currentValue - this.state.interval;
                        this.setState({
                            currentValue: result > this.props.min ? result : this.props.min
                        });
                    }}
                >-</div>
            </div>
        );
    }
}