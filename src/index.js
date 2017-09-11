import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import App from "app";

/****************************************************************
* App Bootstrap
****************************************************************/
function bootstrap() {

    // Render routes
    render(<App/>, document.getElementById("main"));
}

/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap();