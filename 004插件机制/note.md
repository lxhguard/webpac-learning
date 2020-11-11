# 004 插件机制

插件最常见的应用场景：
- 实现自动在打包之前清除 dist 目录（上次的打包结果）；
- 自动生成应用所需要的 HTML 文件；
- 根据不同环境为代码注入类似 API 地址这种可能变化的部分；
- 拷贝不需要参与打包的资源文件到输出目录；
- 压缩 Webpack 打包完成后输出的文件；
- 自动发布打包结果到服务器实现自动部署。

> Webpack 插件机制的目的是为了增强 Webpack 在项目自动化构建方面的能力

一般来说，当我们有了某个自动化的需求过后，可以先去找到一个合适的插件，然后安装这个插件，最后将它配置到 Webpack 配置对象的 plugins 数组中，这个过程唯一有可能不一样的地方就是，有的插件可能需要有一些配置参数。

> clean-webpack-plugin配置到数组中即可，html-webpack-plugin配置到数组中还要配置参数如title等，

## 1.体验插件机制

### 1-1. clean-webpack-plugin

clean-webpack-plugin: 自动清除输出目录

#### 1-1-1. 为什么要清除输出目录？

Webpack 每次打包的结果都是直接覆盖到 dist 目录。
在打包之前，dist 目录中就可能已经存入了一些在上一次打包操作时遗留的文件，当我们再次打包时，只能覆盖掉同名文件，而那些已经移除的资源文件就会一直累积在里面，最终导致部署上线时出现多余文件。

故需要 **clean-webpack-plugin** 在每次完整打包之前，自动清理 dist 目录，这样每次打包过后，dist 目录中就只会存在那些必要的文件。

#### 1-1-2. 安装使用

```js
npm install clean-webpack-plugin --save-dev
```

在 webpack.config.js 中配置如下：

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
```

### 1-2. html-webpack-plugin

html-webpack-plugin: 自动生成使用打包结果的 HTML，即在 HTML 中自动注入 Webpack 打包生成的 bundle。

#### 1-2-1. 硬编码HTML存在的问题

- 项目发布时，需同时发布根目录下的 HTML 文件和 dist 目录中所有的打包结果，且上线后要确保 HTML 代码中的资源文件路径是正确的。
- 如果打包结果输出的目录或者文件名称发生变化，则 HTML 代码中所对应的 script 标签也需要我们手动修改路径。

#### 1-2-2. 解决思路

让 Webpack 在打包的同时，自动生成对应的 HTML 文件，让 HTML 文件也参与到整个项目的构建过程。即，在构建过程中，Webpack 就可以自动将打包的 bundle 文件引入到页面中。

其具体实现就是 html-webpack-plugin 插件。

#### 1-2-3. 自动生成 HTML 的优势

- HTML 也输出到 dist 目录中了，上线时我们只需要把 dist 目录发布出去就可以了；
- HTML 中的 script 标签是自动引入的，所以可以确保资源文件的路径是正常的。

> 对于模板中动态的内容，可以使用 Lodash 模板语法输出，模板中可以通过 htmlWebpackPlugin.options 访问这个插件的配置数据，需要在 webpack.config.js 中配置 template: './src/index.html'

#### 1-2-4. 使用实践

title 和 meta 标签根据配置生成

```js
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
              viewport: 'width=device-width'
            }
        })
    ]
}
```

在源代码中添加一个用于生成 HTML 的模板, 让 html-webpack-plugin 插件根据这个模板去生成页面文件。

```html
<!-- ./src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <div class="container">
        <h1>页面上的基础结构</h1>
        <div id="root"></div>
    </div>
</body>
</html>
```

```js
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            template: './src/index.html'
        })
    ]
}
```

同时输出多个 HTML 文件

>对于同时输出多个 HTML，一般我们还会配合 Webpack 多入口打包的用法，这样就可以让不同的 HTML 使用不同的打包结果。

```js
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 用于生成 index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            template: './src/index.html'
        }),
        // 用于生成 about.html
        new HtmlWebpackPlugin({
            filename: 'about.html'
        })
    ]
}
```

### 1-3. copy-webpack-plugin

copy-webpack-plugin: 复制文件

> 参数：需传入一个字符串数组，用于指定需要拷贝的文件路径。可以是通配符，也可以是相对路径。

> 使用场景：不需要参与构建的静态文件发布到线上时，一般建议，把这类文件统一放在项目根目录下的 public 或者 static 目录中， Webpack 在打包时一并将这个目录下所有的文件复制到输出目录。

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
              viewport: 'width=device-width'
            }
        }),
        new CopyWebpackPlugin([
            patterns: ['public'] // 需要拷贝的目录或者路径通配符
        })
    ]
}
```

### 1-4. 

### 1-5. 


## 2.开发一个插件

自定义插件需求：删除 bundle.js 中的注释```/******/```。

代码见 demo2-myown-plugin目录。

插件的作用范围几乎可以触及 Webpack 工作的每一个环节。

Webpack 的插件机制: **钩子机制**。

Webpack 在每个环节都有钩子，在开发插件时，通过往这些不同节点上挂载不同的任务，即可扩展 Webpack 的能力。

### 2-1. 预定义好的钩子

- Compiler Hooks
- Compilation Hooks
- JavascriptParser Hooks

Webpack 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象，一般我们都会定义一个类型，在这个类型中定义 apply 方法。然后在使用时，再通过这个类型来创建一个实例对象去使用这个插件。

emit钩子在 Webpack 即将向输出目录输出文件时执行。
通过 compiler 对象的 hooks 属性访问到 emit 钩子，再通过 tap 方法注册一个钩子函数，这个方法接收两个参数：
- 第一个是插件的名称，我们这里的插件名称是 RemoveCommentsPlugin；
- 第二个是要挂载到这个钩子上的函数


**插件都是通过往 Webpack 生命周期的钩子中挂载任务函数实现的。**











