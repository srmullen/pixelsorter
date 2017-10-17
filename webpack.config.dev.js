const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
    devtool: "source-map",
    entry: {
        "demo": "./src/pages/demo",
        "pixelsorter": "./src/pages/pixelsorter"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    plugins:[
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            filename: "demo.html",
            template: "./index.html",
            chunks: ["demo"]
        }),
        new HtmlWebpackPlugin({
            filename: "pixelsorter.html",
            template: "./index.html",
            chunks: ["pixelsorter"]
        })
    ],
    resolve: {
        alias: {
            components: path.resolve(__dirname, "src/components"),
            utils: path.resolve(__dirname, "src/utils"),
            sort: path.resolve(__dirname, "src/sort"),
            images: path.resolve(__dirname, "images"),
            root: path.resolve(__dirname, "src"),
            styles: path.resolve(__dirname, "src/styles")
        }
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
        index: "pixelsorter.html",
        port: 5000
    }
}
