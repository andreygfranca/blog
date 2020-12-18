const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()],

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }


}