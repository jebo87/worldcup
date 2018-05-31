const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.[hash].js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }, {
                    test: /\.(png|jpg|gif)$/,
                    use: [{

                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        }
                    }]
                }
            ]
        },
        // devtool: 'source-map',
        plugins: [
            CSSExtract,
            new HtmlWebpackPlugin({
                filename: path.join(__dirname, 'public','index.html'),
                title: 'Mundial de rusia 2018',
                template: path.join(__dirname, 'src','index.html')
            }),
            new CleanWebpackPlugin(['public']),

        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            historyApiFallback: true,
            contentBase: path.join(__dirname, 'public'),
            
        }
    }
}