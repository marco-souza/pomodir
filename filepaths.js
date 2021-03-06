let path = require("path");

module.exports = {
    dest: path.resolve(__dirname, "dist"),

    icon: path.resolve(__dirname, "src/assets/images/logo.jpeg"),

    src: {
        html: "./src/index.pug",
        sitemap: "./src/sitemap.xml",
        index_js: "./src/index.js",
        js: ["./src/**/*.js"],
        assets: [
            "./src/assets/icons/**/*"
        ],
        i18n: ["./src/assets/i18n/**/*"]
    },

    vendor: {
        css: [],
        assets: []
    }
};