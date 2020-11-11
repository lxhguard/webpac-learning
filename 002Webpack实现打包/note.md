# Webpack实现打包

## 1. 解决对应问题的策略

### 1-1. 三个问题

- 能够将散落的模块打包到一起；
- 能够编译代码中的新特性；
- 能够支持不同种类的前端资源模块。

### 1-2. 对应解决方案

- Webpack 作为一个模块打包工具，本身就可以解决模块化代码打包的问题，将零散的 JavaScript 代码打包到一个 JS 文件中。
- 对于有环境兼容问题的代码，Webpack 可以在打包过程中通过 Loader 机制对其实现编译转换，然后再进行打包。
- 对于不同类型的前端模块类型，Webpack 支持在 JavaScript 中以模块化的方式载入任意类型的资源文件，例如，我们可以通过 Webpack 实现在 JavaScript 中加载 CSS 文件，被加载的 CSS 文件将会通过 style 标签的方式工作。

### 1-3. 此外

Webpack 还具备**代码拆分**的能力，它能够将应用中所有的模块按照我们的需要分块打包。这样一来，就不用担心全部代码打包到一起，产生单个文件过大，导致加载慢的问题。我们可以把应用初次加载所必需的模块打包到一起，其他的模块再单独打包，等到应用工作过程中实际需要用到某个模块，再异步加载该模块，实现增量加载，或者叫作渐进式加载，非常适合现代化的大型 Web 应用。

> 打包工具可以使得，我们可以在开发阶段更好的享受模块化带来的优势，同时又不必担心模块化在生产环境中产生新的问题。


## 2. Webpack的基本使用

### 2-1. 无webpack Code

参见 demo1-no-webpack目录

### 2-2. 使用webpack Code

参见 demo2-use-webpack目录

### 2-3. 配置 Webpack 的打包过程

参见 demo3-webpack-config目录

Webpack 4 以后的版本支持零配置的方式直接启动打包，整个过程会按照约定将 src/index.js 作为打包入口，最终打包的结果会存放到 dist/main.js 中。

如果需要指定入/出口文件，通过配置文件的方式修改 Webpack 的默认配置，即 在项目的根目录下添加一个 webpack.config.js 文件。

## 3. 让配置文件支持智能提示

> 编写 Webpack 配置文件的小技巧

在 webpack.config.js 中，添加如下代码：(等配置完成再删除)

```javascript
// ./webpack.config.js
import { Configuration } from 'webpack'
/**
 * @type {Configuration}
 */
```

我们添加的 import 语句只是为了导入 Webpack 配置对象的类型，这样做的目的是为了标注 config 对象的类型，从而实现智能提示。在配置完成后一定要记得注释掉这段辅助代码，因为在 Node.js 环境中默认还不支持 import 语句，如果执行这段代码会出现错误。

上面添加的代码，在完成配置后需要手动注释，所以我们可以更直接的使用：

```javascript
// ./webpack.config.js
/** @type {import('webpack').Configuration} */
```

> 如果上面的代码没有提示效果，那应该是没采用最新版本的VSCode导致的。

这种导入类型的方式是 TypeScript 中提供特性。

## 4. Webpack 工作模式

### 4-1. 配置 Webpack 工作模式的两种方式

- 通过 CLI --mode 参数传入；
- 通过配置文件设置 mode 属性。

### 4-2. Webpack 的三种工作模式

- ```production``` 模式下，启动内置优化插件，自动优化打包结果，打包速度偏慢；（**默认工作模式**）
> production模式下会自启动优化插件，如自动压缩打包后的代码，对实际生产环境非常友好，但代码可读性不高。
- ```development``` 模式下，自动优化打包速度，添加一些调试过程中的辅助插件；
- ```none``` 模式下，运行最原始的打包，不做任何额外处理。

若没有配置工作模式，命令终端会给出一个警告，Webpack 将默认使用 ```production``` 模式去工作。

## 5. 打包结果运行原理

参见 demo4-webpack-mode目录，其下的dist/bundle.js文件。

Webpack 采用 ```none``` 的工作模式，分析打包生成的 ```bundle.js`` 文件，如下：

- 整体生成的代码：一个立即执行函数。 该函数是 Webpack 工作入口（webpackBootstrap）。
> 可选项：它接收一个 modules 参数，调用时传入了一个数组。每个数组元素都是源码模块，实现模块私有作用域。 这个数组在demo4 code中对应 ```__webpack_modules__``` 。```__webpack_modules__``` 是包含了 lxhguard.js、login.js、a.js 的模块数组。
- ```__webpack_module_cache__``` 是缓存加载过的模块，```__webpack_require__``` 是用于加载制定模块的函数，```__webpack_require__.o、__webpack_require__.d、__webpack_require__.r```等等之类的，是挂载了一些其他的数据和工具函数，```__webpack_require__(0)``` 是开始加载源代码中的入口模块。
> 终端通过```serve .```命令，可以在浏览器中单步调试其过程

## 6. 有趣的其他问题

vite在短期内肯定不会取代webpack，另外其实 vite 并不是 bundleless 方案，只是开发阶段不打包，生产阶段内部使用的是 rollup。 BTW，即便是 bundleless 工具成为主流，个人认为也不一定是 vite，有可能是更专业的工具，比如 snowpack


