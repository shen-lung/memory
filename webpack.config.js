const webpack = require('webpack')
const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')
require('dotenv').config({ path: '.env' })

module.exports = (env, argv) => ({
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    'image-webpack-loader',
                ],
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: argv.mode
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './src/favicon.png',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
    ]
});
