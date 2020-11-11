module.exports = {
    entry: './src/main.css',
    mode: 'none',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
                use: [ // 对同一个模块使用多个 loader，注意顺序
                    'style-loader',
                    'css-loader'
                ] // 指定具体的 loader
            }
        ]
    }
}
