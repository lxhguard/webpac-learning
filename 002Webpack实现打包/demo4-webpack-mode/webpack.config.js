// ./webpack.config.js
/** @type {import('webpack').Configuration} */

module.exports = {
    entry: './src/lxhguard.js',
    mode: 'none',
    output: {
        filename: 'bundle.js'
    }
}