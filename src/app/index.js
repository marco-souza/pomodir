import activeWin from "active-win";
import React from "react";
import { connect } from "react-redux";
import LoggerFactory from "utils/logger";
import styles from "./styles";
import Counter from "Counter";

let Logger = new LoggerFactory("app.page");

class Component extends React.Component {
    async componentDidMount() {
        let logger = Logger.create("componentDidMount");
        console.log("componentDidMount");
        logger.info("enter");

        setInterval(() => {
            let active = activeWin.sync();
            logger.info("active window", {app: active.app});
        }, 5000);
    }

    render() {
        console.log("store", this.props.store);
        return (
            <div className={styles.main}>
                <Counter />
            </div>
        );
    }
}

export default connect()(Component);