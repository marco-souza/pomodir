import activeWin from "active-win";
import React from "react";
//import LoggerFactory from "utils/logger";

//let Logger = new LoggerFactory("app.page");

export default class App extends React.Component {
    async componentDidMount() {
        //let logger = Logger.create("componentDidMount");
        //logger.info("enter");

        setInterval(() => {
            let active = activeWin.sync();
            console.log(["active window", active.app]);
        }, 5000);
    }

    render() {
        return (
            <div>
                Finally!! :)
            </div>
        );
    }
}
//I am Monitroll! :)
/*export default (props) => {
    return <App {...props} />
}*/