const webpack = require("webpack");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: ['whatwg-fetch', 'core-js/stable', 'regenerator-runtime/runtime', "./src/index.tsx"]
    },
    mode: 'production',
    devtool: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
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
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.prod.html",
            title: '云汐',
            contextPath: '[[${#servletContext.contextPath}]]',
            hash: false,
            inject: true,
            minify: false,
            favicon: false,
            filename: 'index.html',
            header: `
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link href="/jiagrid/css/jiagrid.css" rel="stylesheet">
                <link href="/jiagrid/css/flatpickr.min.css" rel="stylesheet">
                <script type="text/javascript" src="/jiagrid/jiagrid.js"></script>
            `,
            metas: [
                '<meta th:if="${_csrf}" name="csrfHeaderName" th:content="${_csrf.headerName}">',
                '<meta th:if="${_csrf}" name="csrfToken" th:content="${_csrf.token}">',
                '<meta th:name="contextPath" th:content="${#servletContext.contextPath}">'
            ]
        }),
        new webpack.DefinePlugin({
            "process.env.SERVICE_URI": JSON.stringify("")
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: /href=\"([^\"]*)\"/ig,
                replacement: 'th:href="@{$1}"'
            },
            {
                pattern: /src=\"([^\"]*)\"/ig,
                replacement: 'th:src="@{$1}"'
            },
        ]),
        new FileManagerPlugin({
            onEnd: [{
                copy: [
                    {
                        source: path.resolve(__dirname, 'jiagrid/**'),
                        destination: path.join(__dirname, '../server/src/main/resources/static'),
                    },
                    {
                        source: path.resolve(__dirname, 'dist/css/**'),
                        destination: path.join(__dirname, '../server/src/main/resources/static/css'),
                    },
                    {
                        source: path.resolve(__dirname, 'dist/js/**'),
                        destination: path.join(__dirname, '../server/src/main/resources/static/js'),
                    },
                    {
                        source: path.resolve(__dirname, 'dist/*.html'),
                        destination: path.join(__dirname, '../server/src/main/resources/templates'),
                    },
                ],
            },
            {
                delete: [
                    path.join(__dirname, '../server/src/main/resources/static/js/*.LICENSE.txt'),
                    path.join(__dirname, './dist'),
                ],
            },
            ],
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
    ],
    externals: {
        jquery: 'jQuery'
    },
    stats: {
        all: false,
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
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    minifyFontValues: false,
                    canPrint: true
                }
            })
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                    reuseExistingChunk: true
                }
            },
        },
    },
    /** 如果打包出来的js包比较大，会警告处理 */
    performance: {
        hints: false, // 枚举
        maxAssetSize: 250000, // 512K 整数类型（以字节为单位）
        maxEntrypointSize: 250000, // 整数类型（以字节为单位）
    },
};