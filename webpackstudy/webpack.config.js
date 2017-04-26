let webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin("style/[name].css",{allChunks: true});
module.exports = {
    debug: true,
    devtool: 'source-map',//配置生成Source Maps，选择合适的选项
    entry:   {
        index: __dirname + "/src/index.js",
        vendors: ['jquery', 'underscore']//分离index和第三方库
    },
    output: {
        path:__dirname + "/build",
        filename:"js/[name].js"
    },
    module: {
        // preLoaders: [//loader之前的语法检查
        //     {
        //         test: /\.jsx?$/,
        //         include: __dirname + "/src/",
        //         loader: 'jshint-loader'
        //     }
        // ],
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader",
                //include: './src/data/',
                exclude: __dirname + '/node_modules/',
            },
            {
                test: /(\.js|\.jsx)$/,
                exclude: __dirname + '/node_modules/',
                include: __dirname + '/src/',
                loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
            },
            {
                test: /\.css/,
                exclude: [__dirname + '/src/styles'],
                loader: 'style-loader!css-loader'
            },
            //scss global
            {
                test: /\.scss$/,
                include: [__dirname + '/src/styles/global'],
                exclude: [__dirname + '/node_modules/'],
                loader: extractCSS.extract("style-loader", "css-loader!postcss-loader","scss-loader"),
                //loader: 'style!css?importLoaders=1!postcss'
            },
            //css module
            {
                test: /\.css$/,
                exclude: [__dirname + '/node_modules/', __dirname + '/src/styles/global'],
                include: [__dirname+'/src/styles/pages'],
                loader: extractCSS.extract('style-loader','css-loader?modules&localIdentName=[name]-[local]!postcss-loader'),
            },
            {
                test: /\.(png|jpe?g|svg|gif)/i,
                exclude: __dirname + '/node_modules/',
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
        new webpack.DefinePlugin({//自定义全局变量
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            __DEV__ : true
        }),
        new webpack.optimize.UglifyJsPlugin({//压缩js
            minimize: true,
            compress: {
                warnings: false
            },
            sourceMap: true,
            mangle: true
        }),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
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
        new webpack.NoErrorsPlugin(),
        extractCSS,
        new webpack.ProvidePlugin({//可以全局引用的第三方库
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: "underscore"
        })
    ],
    resolve:{
        extensions:['','.js','.jsx']
    },
    devServer: {
        open:{
          type:true
        },
        // proxy: {
        //     '/*': {
        //         target: 'http://localhost:3000',
        //         secure: false
        //     }
        // },
        port:3001,
        hot: true,
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新

    },
}
