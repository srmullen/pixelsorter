const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
    devtool: "source-map",
    mode: 'development',
    entry: {
        "demo": "./src/pages/demo",
        "pixelsorter": "./src/pages/pixelsorter"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    plugins:[
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
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            // {
            //     test: /\.(jpg|png|svg)$/,
            //     use: ["url-loader"],
            //     options: {
            //         limit: 25000
            //     }
            // }
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: [
              'file-loader'
            ]
          }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "./"),
        index: "pixelsorter.html",
        port: 3400
    }
}
