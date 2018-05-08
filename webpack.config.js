// const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        'babel-polyfill', './src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
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
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devtool: 'source-map',
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]
};