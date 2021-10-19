const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * 开发和发布都需要的配置
 */

module.exports = {
    entry: {
        app: './src/index.tsx',
        //detail: './src/detail.tsx',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: "css/[name].bundle.css",
            chunkFilename: "css/[name].bundle.css"
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                antd: {
                    test: /[\\/]node_modules[\\/](antd|@ant[\\-]design)[\\/]/,
                    name: 'antd',
                    enforce: true,
                    chunks: 'all',
                    priority: -10
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all',
                    priority: -20
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|dist|build)/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                noIeCompat: true,
                            }
                        }
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {

                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            implementation: require.resolve("sass"),
                        },
                    },

                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
            },
            {
                test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
                type: 'asset',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
            }

        ],

    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
