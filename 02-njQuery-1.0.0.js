/**
 * Created by xmg on 2017/2/21.
 */
(function (window, undefined) {
    // 用于创建njQuery对象的工厂方法
    var njQuery = function( ) {
        return new njQuery.fn.init( );
    };
    // 修改njQuery的原型
    njQuery.fn = njQuery.prototype = {
        init:function () {
            
        }
    };

    // 修改init函数的原型为njQuery的原型
    njQuery.fn.init.prototype = njQuery.fn;

    // 将内部创建的njQuery对象暴露给外界使用
    window.njQuery = window.$ = njQuery;
})(window);