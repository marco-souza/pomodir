/* eslint-disable flowtype/require-parameter-type */
let gulp = require("gulp"),
    gutil = require("gulp-util"),
    pug = require("gulp-pug"),
    yaml = require("gulp-yaml"),
    htmlmin = require("gulp-htmlmin"),
    jsonmin = require("gulp-jsonmin"),
    del = require("del"),
    webpack = require("webpack"),
    config = require("common-config"),
    filepaths = require("./filepaths"),
    electron = require("electron-connect").server.create();

let statsInfo = {
    colors: gutil.colors.supportsColor,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
};

let bundleDoneCalled = {};

/****************************************************************
* Clean Tasks : remove destination folders
****************************************************************/
gulp.task("clean", function () {
    return del.sync([
        filepaths.dest,
    ]);
});

/****************************************************************
* Assets Task : copy assets to dist
****************************************************************/
gulp.task("assets", function () {
    return gulp.src(filepaths.src.assets)
        .pipe(gulp.dest(filepaths.dest + "/assets"));
});

/****************************************************************
* Pug Task : compile pug templates
****************************************************************/
gulp.task("pug", function () {
    return gulp.src(filepaths.src.html)
        .pipe(pug({
            locals: config.webinfo
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(filepaths.dest));
});

gulp.task("pug:dev", function () {
    return gulp.src(filepaths.src.html)
        .pipe(pug({
            locals: config.webinfo
        }))
        .pipe(gulp.dest(filepaths.dest));
});

/****************************************************************
* Bundle Docs Tasks : bundle all docs js files into one
****************************************************************/
gulp.task("bundle:dev", function (done) {
    webpack(require("./webpack/dev.config"), (err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);

        gutil.log("[webpack]", stats.toString(statsInfo));

        if (!bundleDoneCalled.docs) {
            bundleDoneCalled.docs = true;
            done();
        }
    });
});

/****************************************************************
* DEVELOPMENT TASK
****************************************************************/
gulp.task("development", [
    "pug:dev",
    "bundle:dev"
], function () {
    electron.start();

    gulp.watch(filepaths.src.html, ["pug:dev"]);
    gulp.watch(filepaths.src.assets, ["assets"]);

    // Restart browser process
    gulp.watch("main.js", electron.restart);


    // Reload renderer process
    gulp.watch(["./dist/**/*.js", "./dist/**/*.html"], electron.reload);
});

/****************************************************************
* PRODUCTION TASK
****************************************************************/
gulp.task("production", [
    "pug:dev",
    "bundle:dev"
], function () {
    electron.start();

    gulp.watch(filepaths.src.html, ["pug:dev"]);
    gulp.watch(filepaths.src.assets, ["assets"]);

    // Restart browser process
    gulp.watch("main.js", electron.restart);


    // Reload renderer process
    gulp.watch(["./dist/**/*.js", "./dist/**/*.html"], electron.reload);
});

/****************************************************************
* DEFAULT TASK : Choose task by NODE_ENV
****************************************************************/
gulp.task("default", [
    "clean",
    "assets",
    process.env.NODE_ENV || "production"
]);