# 009 高级特性-项目优化

## 1. Tree Shaking

Tree-shaking 并不是指 Webpack 中的某一个配置选项，而是一组功能搭配使用过后实现的效果，这组功能在生产模式下都会自动启用，所以使用生产模式打包就会有 Tree-shaking 的效果。

> optimization 优化
> minimize 最小化，压缩
> concatenate 级联    尽可能合并每一个模块到每一个函数中  该特性又被称为Scope Hoisting

Tree-shaking 实现的前提是 ES Modules，也就是说：最终交给 Webpack 打包的代码，必须是使用 ES Modules 的方式来组织的模块化。

> Babel-loader

## 2. sideEffects

- Tree Shaking只能移出没有用到的**代码成员**
- sideEffects 用于移出没有用到的**代码模块**





