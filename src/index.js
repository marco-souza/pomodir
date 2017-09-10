import React from "react";
import { render } from "react-dom";
import config from "config";

/****************************************************************
* App Bootstrap
****************************************************************/
function bootstrap() {
    
    // Render routes
    render(
        <div>
            Jacinto Electron {config.test}
        </div>
        , 
        document.getElementById("main")
    );
}

/****************************************************************
* Run Bootstrap
****************************************************************/
bootstrap();