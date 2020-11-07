const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './kinopoisk/public/main.js',
    output: {
        path: path.resolve(__dirname, 'kinopoisk', 'public', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
         new MiniCssExtractPlugin({filename: 'bundle.css'})
    ]
};