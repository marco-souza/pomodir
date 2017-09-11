import activeWin from "active-win";
import React from "react";
import { render } from "react-dom";

/****************************************************************
* App Bootstrap
****************************************************************/
function bootstrap() {
    
    setInterval(() => {
        let active = activeWin.sync();
        console.log(["active window", active]);
    }, 5000);

    // Render routes
    render(
        <div>
            I am Monitroll! :)
        </div>
        , 
        document.getElementById("main")
    );
}

/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap();