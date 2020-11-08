const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './kinopoisk/public/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.handlebars$/,
                use: {
                    loader: 'handlebars-loader'
                },
                exclude: /(node_modules)/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images',
                    }
                }]
            },
        ]
    },
    plugins: [
         new MiniCssExtractPlugin({filename: 'bundle.css'}),
         new HtmlWebpackPlugin({inject: true, template: './kinopoisk/public/index.html'}),
        new WorkboxPlugin.GenerateSW()
    ]
};