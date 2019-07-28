const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function generateHtml(htmltemplate) {
    return new HtmlWebpackPlugin({
        filename: `${htmltemplate}.html`,
        template: `./app/${htmltemplate}.html`,
    });
}

const htmlIndex = generateHtml('index');
const htmlServices = generateHtml('services');
const htmlJob = generateHtml('job');
const htmlBlog = generateHtml('blog');
const htmlArticle = generateHtml('article');

module.exports = (env, options) => {

    const devMode = options.mode !== 'production';

    return {

        entry: {
            vendor: './app/js/vendor.js',
            swiper: './app/js/plugins.js',
            app: './app/app.js',
        },

        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].min.js'
        },

        plugins: [
            new CopyPlugin([
                { from: './app/icomoon/fonts', to: 'fonts' },
                { from: './app/images', to: 'images' },
            ]),
            new MiniCssExtractPlugin({
                filename: devMode ? 'css/[name].css' : 'css/[name].[chunkhash].min.css',
                chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[chunkhash].min.css',
            }),
            new ImageminPlugin({ test: './app/images/**' }),
            new ImageminPlugin({
                //disable: process.env.NODE_ENV !== 'production', // Disable during development
                pngquant: {
                    quality: '65-70'
                }
            })
        ]
            .concat(htmlIndex)
            .concat(htmlServices)
            .concat(htmlJob)
            .concat(htmlBlog)
            .concat(htmlArticle),


        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new UglifyJsPlugin(),
            ],
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node-modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use:  [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [

                        //"style-loader",
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.resolve(__dirname, 'dist'),
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.(svg|eot|ttf|woff|woff2)$/,
                    include: [
                        path.resolve(__dirname, 'app/icomoon/fonts'),
                    ],
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            publicPath: path.resolve(__dirname, 'dist/fonts'),
                            name: "fonts/[name].[ext]",
                        }
                    }
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    include: [
                        path.resolve(__dirname, 'app/images'),
                    ],
                    use: {
                        loader: "file-loader",
                        options: {
                            publicPath:  (url, resourcePath, context) => {
                                if (/flags/.test(resourcePath)) {
                                    return `../images/flags/${url}`;
                                }
                                return `../images/${url}`;
                            },
                            outputPath: (url, resourcePath, context) => {
                                if (/flags/.test(resourcePath)) {
                                    return `images/flags/${url}`;
                                }
                                return `images/${url}`;
                            },
                            name:'[name].[ext]'
                        }
                    }
                }


            ]
        },

        devtool: 'source-map',
        //devtool: 'cheap-module-eval-source-map',

    }
};

