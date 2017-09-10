module.exports = {
    "verbose": true,
    "roots": ["../src"],
    "testMatch": [
        "**/__tests__/**/*.test.js"
    ],
    "moduleFileExtensions": ["styl", "js"],
    "moduleDirectories": ["..", "../src", "../node_modules"],
    "moduleNameMapper": {
        ".*\\.(css|styl)$": "identity-obj-proxy",
        ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/file.js"
    },
    "transform": {
        "^.+\\.js$": "babel-jest"
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/**/*.js",
        "!**/node_modules/**",
        "!**/__tests__/*.js",
    ],
    /*"coverageThreshold": {
        "global": {
            "branches": 80,
            "functions": 80,
            "lines": 80,
            "statements": 80
        }
    }*/
}