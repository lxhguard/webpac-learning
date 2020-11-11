/**
 * ./remove-comments-plugin.js
 * 
 * Webpack 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象，
 * 一般我们都会定义一个类型，在这个类型中定义 apply 方法。
 * 在使用时，通过这个类型来创建一个实例对象去使用这个插件。
 * 
 * 插件都是通过往 Webpack 生命周期的钩子中挂载任务函数实现的。
 */
class RemoveCommentsPlugin {
    apply (compiler) {
        compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
            // compilation => 此次打包的上下文,包含构建的所有配置信息
            for (const name in compilation.assets) {
                if (name.endsWith('.js')) {
                    const contents = compilation.assets[name].source()
                    const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
                    compilation.assets[name] = {
                        source: () => noComments,
                        size: () => noComments.length
                    }
                }
            }
        })
    }
}
  

  