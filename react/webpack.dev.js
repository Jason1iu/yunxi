const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 开发模式的配置
 */
module.exports = merge(common, {
    mode: 'development',
    devtool: "inline-cheap-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.ejs'),
            filename: 'index.html',
            chunks: ["app"],
            title: '云汐·科技',
        }),
        new webpack.DefinePlugin({
            "process.env.SERVICE_URI": JSON.stringify("http://localhost:3000")
        })
    ],
    devServer: {
        static: './dist',
        hot: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\//,
                    to: function (context) {
                        const spath = context.parsedUrl.pathname;
                        let i = spath.indexOf('/resources/');
                        if (i > 0)
                            return spath.slice(i);
                        return '/index.html';
                    }
                }
            ]
        },
        port: 8429,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '/' },
                secure: false,
                ws: false,
                changeOrigin: true,
                auth: 'yunxi:123456',
            },
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE,PUT,HEADER',
            'Access-Control-Max-Age': 3600,
            'Access-Control-Allow-Headers': 'x-requested-with,Authorization,Content-Type',
            'Access-Control-Allow-Credentials': true,
        },
    },
});
