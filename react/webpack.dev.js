const webpack = require("webpack");
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * 开发和发布都需要的配置
 */
const buildPath = path.join(__dirname, './dist');

module.exports = {
    entry: {
        app: ["./src/index.tsx"],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.dev.html",
            title: 'Yunxi',
            chunks: ["app"],
            filename: 'index.html',
            hash: false,
            metas: [
                // '<meta th:if="${_csrf}" name="csrfHeaderName" th:content="${_csrf.headerName}">',
                // '<meta th:if="${_csrf}" name="csrfToken" th:content="${_csrf.token}">',
                // '<meta th:name="contextPath" th:content="${#servletContext.contextPath}">'
            ]
        }),
        new webpack.DefinePlugin({
            "process.env.SERVICE_URI": JSON.stringify("http://localhost:8080")
        }),
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(zh-cn)$/
        ),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: "css/[name].bundle.css",
            chunkFilename: "css/[name].bundle.css"
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}'
            },
            async: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(__dirname, './jiagrid'), to: path.join(buildPath, './jiagrid') },
            ],
        }),
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\//,
                    to: function (context) {
                        const spath = context.parsedUrl.pathname;
                        const i = spath.indexOf('/js/');
                        if (i > 0)
                            return spath.slice(i);
                        const i1 = spath.indexOf('/css/');
                        if (i1 > 0)
                            return spath.slice(i1);
                        return '/index.html';
                    }
                }
            ]
        },
        disableHostCheck: true,
        port: 8084,
        compress: false,
        inline: true,
        hot: true,
        proxy:
            [{
                context: ['/api', '/webjars'],
                target: 'http://localhost:8080',
                auth: 'zsj:dev',
                secure: false,
                changeOrigin: true
            }],
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE,PUT,HEADER',
            'Access-Control-Max-Age': 3600,
            'Access-Control-Allow-Headers': 'x-requested-with,Authorization,Content-Type',
            'Access-Control-Allow-Credentials': true
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|dist|build)/
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
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
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
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 30000,
                            name: '[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: 'iconfont/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    stats: {
        all: false,
        assets: true,
        timings: true,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true,
        warningsFilter: (warning) => {
            if (warning.indexOf('mini-css-extract-plugin') !== -1 && warning.indexOf('Conflicting order between') !== -1)
                return true;
            else
                return false;
        },
    }
};