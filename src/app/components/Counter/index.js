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

    async componentDidMount() {
        let logger = Logger.create("componentDidMount");
        logger.info("enter");
    }

    render() {
        return (
            <div className={styles.centeredWrap}>
                <div className={styles.counter}>
                    <div className={styles.inputs} >

                        {/* Minutes Select */}
                        <NumberSelect init={this.props.min} interval={5} max={60}/>
                        {/* Seconds Select */}
                        <NumberSelect init={this.props.sec} interval={10} max={59}/>

                    </div>

                    {/* TODO: Make it increase  */}
                    <div className={styles.fill} ></div>
                </div>
            </div>
        );
    }
}