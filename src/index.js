import "babel-polyfill";
import "./styles";
import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import countdownReducer from "reducers/countdown";
import App from "app";

let store = createStore(countdownReducer);

/****************************************************************
* App Bootstrap
****************************************************************/
function bootstrap() {

    // Render routes
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("main")
    );
}

/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap();