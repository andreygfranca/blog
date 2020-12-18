const path = require("path");

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }


}