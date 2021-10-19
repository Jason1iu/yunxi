const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

/**
 * 发布模式的配置 
 **/
module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.prod.ejs'),
            contextPath: '[[${#servletContext.contextPath}]]',
            hash: false,
            favicon: false,
            minify: false,
            filename: 'index.html',
            chunks: ["app"],
            title: '云汐·科技',
            metas: [
                '<meta name="csrfHeaderName" th:content="${_csrf.headerName}">',
                '<meta name="csrfToken" th:content="${_csrf.token}">',
            ],
        }),
        new webpack.DefinePlugin({
            "process.env.SERVICE_URI": JSON.stringify("")
        }),
        new FileManagerPlugin({
            events: {
                onStart: {

                },
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, 'dist'),
                            destination: path.join(__dirname, '../src/main/resources/static'),
                        },
                        {
                            source: path.join(__dirname, 'dist/index.html'),
                            destination: path.join(__dirname, '../src/main/resources/templates/index.html'),
                        },

                    ],
                    delete: [
                        {
                            source: path.join(__dirname, '../src/main/resources/static/js/*.js.LICENSE.txt'),
                            options: {
                                force: true,
                            },
                        },
                        {
                            source: path.join(__dirname, '../src/main/resources/static/index.html'),
                            options: {
                                force: true,
                            },
                        }
                    ],
                },
            }
        }),
    ],
    /** 如果打包出来的js包比较大，会警告处理 */
    performance: {
        hints: false, // 枚举
        maxAssetSize: 250000, // 512K 整数类型（以字节为单位）
        maxEntrypointSize: 250000, // 整数类型（以字节为单位）
    },
});
