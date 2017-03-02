/**
 * Created by xmg on 2017/2/21.
 */
(function (window, undefined) {
    // 用于创建njQuery对象的工厂方法
    var njQuery = function(selector) {
        return new njQuery.fn.init( selector );
    };
    // 修改njQuery的原型
    njQuery.fn = njQuery.prototype = {
        init:function (selector) {
            // 1.传入 '' null undefined NaN  0  false , 直接返回空对象, this
            if(!selector){
                return this;
            }
            // 2.传入的是字符串, 那么需要判断是选择器还是html代码片段
            else if(typeof selector === 'string'){
                // 2.1如果是html代码片段, 会先根据html代码片段创建DOM元素, 然后将创建好的元素添加到jQ对象中
                // 最简单的代码片段: <a>
                // 先你判断是否以<开头, 再判断是否以>结尾, 再判断长度是否>=3
                if(selector.charAt(0) === '<' &&
                selector.charAt(selector.length - 1) === '>' &&
                selector.length >= 3){
                    // console.log('代码片段');
                    // 1.先手动创建一个DOM元素
                    var temp = document.createElement('div');
                    // 2.利用innerHTML将代码片段直接写入创建的DOM元素中
                    temp.innerHTML = selector;
                    /*
                    // 3.从临时的DOM元素中取出创建好的元素
                    for(var i = 0, len = temp.children.length; i < len; i++){
                        // console.log(temp.children[i]);
                        this[i] = temp.children[i];
                    }
                    // 4.给jQ对象添加lenght属性
                    this.length = temp.children.length;
                    */
                    /*
                    谁调用就push到谁上, 一般情况下都是利用数组调用, 所以都是push到了数组上
                     如果利用apply修改了push内部的this, 那么push就是push到修改之后的那个对象上
                     也就是说把push的this修改为了谁, 将来就push到谁上
                     apply有一个特点, 会将传入的参数依次取出来传入给指定的方法
                    */
                    [].push.apply(this, temp.children);
                }
                // 2.2如果是选择器, 将查找的DOM元素存储到当前jQ对象中返回
                else{
                    // console.log('选择器');
                    // 1.根据传入的选择器在当前界面中查找对应的元素
                    var nodes = document.querySelectorAll(selector);
                    /*
                    // 2.将查找的DOM元素存储到当前jQ对象中返回
                    for(var i = 0, len = nodes.length; i < len; i++){
                        this[i] = nodes[i];
                    }
                    this.length = nodes.length;
                    */
                    [].push.apply(this, nodes);
                }
            }

        }
    };

    // 修改init函数的原型为njQuery的原型
    njQuery.fn.init.prototype = njQuery.fn;

    // 将内部创建的njQuery对象暴露给外界使用
    window.njQuery = window.$ = njQuery;
})(window);