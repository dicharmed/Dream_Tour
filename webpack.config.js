const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // it creates a css file, so it wouldn't be in the js file
const HtmlWebpackPlugin = require('html-webpack-plugin'); // it collects html so in the html all scripts automatically includes
const CleanWebpackPlugin = require('clean-webpack-plugin'); //to clean the dist dir so its rewrites every data in that dir


module.exports =(env, { mode }) => {
    const devMode = mode !== 'production'; //otherwise its always mode development by default
    return {
        devtool:'source-map',
        entry: {
            app: path.resolve('./src/main.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js'
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'), //it points what file its gonna serf
            port: 9000, //localhost
            // hot: true, // hot reload scripts but don't reload html page
            overlay: true, //in order to watch the errors on the screen
            open: true //
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
                { 
                    test: /\.(c|sc|sa)ss$/, 
                    use:[
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader, //to create a css file for production, otherwise css'll be inside js file
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }                            
                        },
                        {
                            loader:'css-loader', 
                            options: {
                                sourceMap: true
                            }
                        },
                        'postcss-loader', 
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: false
                            }
                        }
                    ]
                },
                {
                    test: /\.pug$/,
                    use: [
                    {
                        loader:'pug-loader',
                        options: {
                            pretty: true //set offsets and spaces otherwise it'll create inline html
                        }
                    }],
                    
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192 //if the size of the file is less than 8192 the file will be coded into base64 like data:....blah blah
                        }
                    }
                },
                {
                    test: /\.(ttf|woff|woff2|eot)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve('./src/html/pages/index.pug'),
                filename: 'index.html'               
            }),
            new CleanWebpackPlugin()
        ]
    }
    
}