import activeWin from "active-win";
import React from "react";
import LoggerFactory from "utils/logger";
import styles from "./styles";
import Counter from "Counter";

let Logger = new LoggerFactory("app.page");

export default class App extends React.Component {
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
        return (
            <div className={styles.main}>
                <Counter min={25} sec={0} />
            </div>
        );
    }
}