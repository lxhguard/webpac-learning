// webpack的配置文件

// Webpack 从 src/lxhguard.js 文件开始打包, 生成output目录, 打包文件为 bundle.js

// webpack.config.js 是运行在 Node.js 环境中的代码，所以直接可以使用 path 之类的 Node.js 内置模块。
const path = require('path');

module.exports = {
    entry: './src/lxhguard.js',
    output: { // 输出文件的位置, 其属性值必须是一个对象
        filename: 'bundle.js', // 指定输出文件的文件名称
        path: path.join(__dirname, 'output') // 指定输出的目录
    }
}
  