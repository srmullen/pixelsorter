const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
    devtool: "eval-source-map",
    entry: [
        "./src/main"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins:[
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
        })
    ],
    resolve: {
        alias: {
            components: path.resolve(__dirname, "src/components"),
            images: path.resolve(__dirname, "images")
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
        port: 5000
    }
}
