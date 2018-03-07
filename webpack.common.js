const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const process = require('process');

const config = {
    entry: {
        polyfill: "babel-polyfill",
        app: './src/app.js',
        sw: './src/sw.js',
        style: './sass/style.sass'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    /*{
                        loader: 'ifdef-loader',
                        options: {
                            PRODUCTION: process.env.NODE_ENV === 'production',
                            version: 3,
                        },
                    },*/
                ]
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                }),
            },
            {
                test: /\.(sass|scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [path.resolve(__dirname, 'node_modules')],
                            }
                        }
                    ],
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                use: 'url-loader?limit=1024&name=/fonts/[name].[ext]'
            }
            /*{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?limit=1024&name=/fonts/[name].[ext]',
            }*/
        ]
    },
    plugins: [
        new ExtractTextPlugin({
          filename: 'bundle.css'
        }),
        new HtmlWebpackPlugin({
            title: 'Production',
            template: './src/index.template.html'
        }),
    ],
};
module.exports = config;