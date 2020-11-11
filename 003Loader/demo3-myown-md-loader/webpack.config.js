// ./webpack.config.js
module.exports = {
    entry: './src/main.js',
    mode: 'none',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                // 直接使用相对路径
                use: './markdown-loader'
            }
        ]
    }
}
  