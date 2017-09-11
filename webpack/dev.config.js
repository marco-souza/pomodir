let lodash = require("lodash"),
    baseConfig = require("./base.config");

// Merge with base config
let config = lodash.merge({}, baseConfig, {
    watch: true,
    devtool: "source-map"
});

// Export config
module.exports = config;