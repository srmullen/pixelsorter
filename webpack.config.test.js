const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
    devtool: "source-map",
    entry: [
        "./test/browser"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins:[
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./test/mocha.html"
        })
    ],
    resolve: {
        alias: {
            components: path.resolve(__dirname, "src/components"),
            utils: path.resolve(__dirname, "src/utils"),
            src: path.resolve(__dirname, "src/utils"),
            node_modules: path.resolve(__dirname, "node_modules"),
            images: path.resolve(__dirname, "images")
        }
    },
    node: {
        fs: "empty",
        child_process: "empty"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        },
        {
            test: /\.js$/,
            loaders: ["babel-loader"],
            exclude: /node_modules/
        },
        {
            test: /\.(jpg|png|svg)$/,
            loader: "url-loader",
            options: {
                limit: 25000
            }
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 5050
    }
}
