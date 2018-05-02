// const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        'babel-polyfill', './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'classifierTool',
        sourceMapFilename: '[file].map'
    },
    devServer: {
        contentBase: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool: 'source-map',
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]
};