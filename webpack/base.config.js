let path = require("path"),
    webpack = require("webpack"),
    FlowtypePlugin = require("flowtype-loader/plugin"),
    filepaths = require("../filepaths");

module.exports = {
    target: "electron-renderer",

    entry: {
        index: filepaths.src.index_js
    },
    output: {
        path: filepaths.dest,
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader", options: {
                            name: "/fonts/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader", options: {
                            modules: true,
                            sourceMap: true,
                            camelCase: true,
                            localIdentName: "[hash:base64:5]"
                        }
                    },
                    {
                        loader: "stylus-loader", options: {
                            preferPathResolver: "webpack"
                        }
                    }
                ]
            },

            {
                test: /.jsx?$/,
                enforce: "pre",
                exclude: /node_modules|lodash|config/,
                use: [
                    {
                        loader: "eslint-loader", options: {
                            emitWarning: true
                        }
                    }
                ]
            },

            {
                test: /\.jsx?$/,
                loader: "flowtype-loader",
                enforce: "pre",
                exclude: /node_modules/
            },

            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader", options: {
                            presets: ["flow", "env", "react"],
                            plugins: [
                                "autobind-class-methods",
                                "transform-class-properties",
                                "transform-export-extensions",
                                "add-module-exports"
                            ]
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "url-loader", options: {
                            limit: 8192,
                            name: "images/[sha512:hash:base64:7].[ext]",
                            publicPath: "/assets/"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "darch": path.resolve(__dirname, "..")
        },
        modules: [
            path.resolve(__dirname, ".."),
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../src/app"),
            path.resolve(__dirname, "../docs/src"),
            path.resolve(__dirname, "../node_modules"),
            path.resolve(__dirname, "../src/app/components"),
        ],
        extensions: [".js", ".jsx", ".styl", ".css", ".png", ".jpg"]
    },
    externals: {
        "active-win": "require('active-win')"
    },
    node: {
        console: true,
        process: true,
        __dirname: false
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            "NODE_ENV"
        ]),
        new FlowtypePlugin()
    ]
};