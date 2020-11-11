(function ($) { // 通过参数明显表明这个模块的依赖
    let moduleName = 'loginModule';
    function bodyClick () {
        console.log(moduleName + '#bodyClick');
        $('body').click(function(){
            console.log('body click');
        });
    }
    window.login = {
        bodyClick: bodyClick
    }
})(jQuery);


