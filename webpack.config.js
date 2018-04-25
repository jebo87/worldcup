const path = require('path');

module.exports = (env) => {

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
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
                    use: [
                        {
                            loader: "style-loader" // create style nodes from JS Strings
                        }, {
                            loader: "css-loader" // translate CSS into CommonJS
                        }, {
                            loader: "sass-loader" // compiles Sass to CSS
                        }
                    ]
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
        devtool: 'inline-source-map',
        devServer: {
            host: '0.0.0.0',
            disableHostCheck: true,
            historyApiFallback: true,
            contentBase: path.join(__dirname, 'public'),
            
        }
    }
}