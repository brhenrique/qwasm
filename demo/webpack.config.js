const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './index.jsx',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['.jsx', '.js', '.css'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin({
        inject: false,
        templateContent: ({htmlWebpackPlugin}) => `
    <html>
      <head>
        ${htmlWebpackPlugin.tags.headTags}
      </head>
      <body>
        <div id="root"></div>
        ${htmlWebpackPlugin.tags.bodyTags}
      </body>
    </html>`
    })]
}
