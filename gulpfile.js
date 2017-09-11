/* eslint-disable flowtype/require-parameter-type */

let gulp = require("gulp"),
    electron = require("electron-connect").server.create();

/****************************************************************
* DEVELOPMENT TASK
****************************************************************/
gulp.task("development", function () {
    electron.start();

    gulp.watch(["./src/**/*.js", "./index.html"], electron.reload);
});

/****************************************************************
* DEFAULT TASK : Choose task by NODE_ENV
****************************************************************/
gulp.task("default", [
    process.env.NODE_ENV || "production"
]);