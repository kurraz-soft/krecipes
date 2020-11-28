const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000,
        overlay: true,
        host: "localhost",
    },
    devtool: 'inline-source-map',
});