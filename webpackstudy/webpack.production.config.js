let webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin("style/[name].css",{allChunks: true});
module.exports = {
    debug: true,
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    entry:   {
        index: __dirname + "/src/index.js"
    },
    output: {
        path:__dirname + "/build",
        filename:"js/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader",
                //include: './src/data/',
                exclude: './node_modules/',
            },
            {
                test: /(\.js|\.jsx)$/,
                exclude: './node_modules/',
                include: __dirname + '/src/',
                loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.css$/,
                exclude: './node_modules/',
                loader: extractCSS.extract("style-loader", "css-loader!postcss-loader"),
                //loader: 'style!css?importLoaders=1!postcss'
            },
            {
                test: /\.scss$/,
                exclude: './node_modules/',
                include: __dirname+'/src/styles/',
                loader: extractCSS.extract('style-loader','css-loader?modules&localIdentName=[name]-[local]!postcss-loader','sass-loader?sourceMap=true'),
                //loader: 'style-loader!css-loader?modules&localIdentName=[name]!postcss-loader!sass-loader?sourceMap=true'
            },
            {
                test: /\.(png|jpe?g|svg|gif)/i,
                exclude: './node_modules/',
                loaders: [
                    'url-loader?limit=20000&name=/assets/[name]-[hash:5].[ext]',
                    'image-webpack-loader'
                ]
            },

        ]
    },
    //图片压缩
    imageWebpackLoader: {
        gifsicle: {
            optimizationLevel: 2
        },
        mozjpeg: {
            quality: 65
        },
        pngquant:{
            quality: "65-90",
            speed: 4
        },
        svgo:{
            plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
            ]
        }
    },
    postcss: [
        require('autoprefixer')({
            broswers: ['last 5 versions']
        })
    ],
    plugins: [
        new webpack.BannerPlugin(" test"),
        new webpack.optimize.UglifyJsPlugin({//压缩js
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'test',
            filename: 'index.html',
            template: __dirname + "/src/index.tmpl.html",
            inject:'body',
            minify:{
                collapseWhitespace: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        extractCSS,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: "underscore"
        })
    ],
}
