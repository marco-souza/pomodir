let lodash = require("lodash"),
    path = require("path"),
    baseConfig = require("./base.config"),
    filepaths = require("../filepaths");

// Merge with base config
let config = lodash.merge({}, baseConfig, {
    output: {
        path: filepaths.dest + "/assets/"
    },
    watch: true,
    devtool: "source-map"
});

// Export config
module.exports = config;