const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: [
        "babel-polyfill",
        './src/app.js',
        './sass/style.sass'
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
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
            /*{
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                use: 'url-loader?name=/fonts/[name].[ext]'
            }*/
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
            }
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