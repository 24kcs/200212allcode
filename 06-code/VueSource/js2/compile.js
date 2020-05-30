// 编译的构造器el---'#app',vm----Vue的实例对象
function Compile(el, vm) {
    // 先把vm对象保存到$vm属性中
    // 此时的this是编译的实例对象
    this.$vm = vm;
    // 如果'#app'是标签则存储到$el属性中,如果el是选择器'#app'那么会根据选择器来获取html中的div标签,最终存储到$el属性中
    // $el中存储的就是div容器标签对象
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断div是否存在
    if (this.$el) {
        // 创建文档碎片对象,并把div容器中所有的节点全都存放在文档碎片对象
        this.$fragment = this.node2Fragment(this.$el);
        // 模版解析------>
        this.init();
        // 把模版解析后的文档碎片对象放在div容器中,这行代码执行完毕后,页面可以看到真实的信息数据了
        this.$el.appendChild(this.$fragment);
    }
}
// 编译对象的原型对象
Compile.prototype = {
    constructor: Compile,
    // 把传入进来的div标签中所有的节点全部的存储在文档碎片对象中----都放在虚拟DOM中
    node2Fragment: function(el) {
        // 创建文档碎片对象
        var fragment = document.createDocumentFragment(),
            child;

        // 将div容器中所有的节点全部的放在文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 模版解析的方法
    init: function() {
        // 才是真正的模版解析的操作
        this.compileElement(this.$fragment);
    },
    // 模版解析的操作
    compileElement: function(el) {
        // el----文档碎片对象,childNodes--->文档碎片对象中所有的子节点
        var childNodes = el.childNodes,
        // me----编译对象
            me = this;
        // 由于文档碎片对象中的所有的子节点组合成的数组是伪数组,但是需要调用数组的forEach方法进行遍历,所以,才用伪数组转真数组的方式来调用方法进行遍历
        [].slice.call(childNodes).forEach(function(node) {
            // node----每个子节点
            // text---->当前节点的文本内容
            var text = node.textContent;
            // 插值语法的正则表达式
            var reg = /\{\{(.*)\}\}/;   
            // 判断当前的节点是不是标签
            if (me.isElementNode(node)) {
                // 如果当前的node节点是标签,就会开始进行编译
                me.compile(node);

                // 当前的节点是不是文本节点,并且文本节点是不是和上面的正则匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 插值语法的解析
                // node----{{msg}}---文本节点
                // RegExp---正则对象   $1---->正则表达式中的第一个分组    /(1)(2(3))(4(5))/

                // node---{{msg}},第二个参数:msg
                me.compileText(node, RegExp.$1.trim());
            }
            // 判断当前的节点里面还有没有其他的子节点,如果有则继续的递归遍历(当前节点中没有任何的子节点)
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },
    // node-----button标签节点
    compile: function(node) { 
        // 获取当前节点的所有的属性  <button v-on:click="showName">按钮</button>
        // nodeAttrs ---->  v-on:click="showName"
        var nodeAttrs = node.attributes,
        // 当前的编译实例对象
            me = this; 
        // 遍历当前节点中所有的属性  v-on:click="showName"
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // attrName---->v-on:click
            var attrName = attr.name;
            // 判断当前的属性是不是一个指令
            if (me.isDirective(attrName)) {
                // exp ----->showName
                var exp = attr.value;
                // dir ----->on:click
                var dir = attrName.substring(2);
                // 判断当前的指令是不是事件指令
                if (me.isEventDirective(dir)) {
                    // 说明此时是事件指令
                    // node---button按钮,me.$vm---->vm,exp---->showName,dir---->on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                   
                } else {  // 当前的指令是普通指令
                    // compileUtil.text('p',vm,'msg')
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                // 此时标签已经绑定了对应的事件

                // 把当前这个标签节点上的属性全部干掉    <button>按钮</button>
                node.removeAttribute(attrName);
            }
        });
    },
    // 解析插值:node---{{msg}},exp---->msg
    compileText: function(node, exp) {
        // node----{{msg}},this.$vm----vm实例对象,exp----msg
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断当前的这个属性是不是指令
    isDirective: function(attr) {
        // 当前的这个属性是不是v-开头
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的指令是不是事件指令
    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },
    // 判断当前的节点是不是标签,如果是标签则返回true,否则返回false
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 判断当前的节点是不是文本,如果是文本则返回true,否则返回false
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //  node----{{msg}},vm,exp---msg
    text: function(node, vm, exp) {
        // 调用bind node----{{msg}},vm,exp---msg  'text'
        this.bind(node, vm, exp, 'text');
    },
    // v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    // v-model指令
    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },
    // v-class 指令
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // node----{{msg}},vm,exp---msg  dir----->'text'

    // v-bind指令
    bind: function(node, vm, exp, dir) {
        // updater--->对象
        // updater['textUpdater']---->updater.textUpdater
        // updaterFn---->方法
        var updaterFn = updater[dir + 'Updater'];
        // 判断当前的方法是否存在,同时还要进行调用
        // node----{{msg}}  vm,exp----msg
        //  updaterFn && updaterFn('{{msg}}', '绣花枕头');
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // ============dir----指令,exp---表达式
        // 监视对象
        // 第一个参数:vm实例对象,第二个参数:exp表达式,第三个参数是回调函数
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理  // node---button按钮,vm,exp---->showName,dir---->on:click
    eventHandler: function(node, vm, exp, dir) {
        // eventType---->click
        var eventType = dir.split(':')[1],
        // 判断methods对象是否存在,同时获取showName属性的值(该属性的值是函数)
        // fn----->showName
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click和showName是否都存在
        if (eventType && fn) {
            // node----button按钮
            // 通过addEventListener,为button绑定click,对应的回调函数就是showName函数,
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // 根据vm实例对象找data属性中的msg的属性值  vm._data.msg
    _getVMVal: function(vm, exp) {
        // val---vm对象
        var val = vm;
        // exp--->数组----->exp.split('.')  {{obj.name}}
        exp = exp.split('.');
        // 遍历的是表达式数组,k---msg
        exp.forEach(function(k) {
            // val=val--->vm对象
            // val = vm['msg']--->val=vm.msg
            // val='绣花枕头'
            val = val[k];
        });
        // 返回的就是msg属性的值
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

// 更新的对象
var updater = {

    // 插值语法的文本替换操作的方法
    // node--- '{{msg}}'  value='绣花枕头'

    // v-text指令最终会执行到这里 
    textUpdater: function(node, value) {
        // node--->{{msg}}.textContent='绣花枕头'
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html的指令最终会执行这里
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    //  v-class指令   :class
    classUpdater: function(node, value, oldValue) {
        // 获取当前的节点的类样式的名字
        var className = node.className;
        // 类样式的名字替换为空格的方式(如果原来有类样式的名字,就把这个名字获取到)
        className = className.replace(oldValue, '').replace(/\s$/, '');
        // space最终存储一个空格(前提:是标签默认还有其他的类样式的名字,如果没有则空格也没有)
        var space = className && String(value) ? ' ' : '';
        // 最后该标签上有原来的类样式名字+空格+现在的类样式名字
        // <p class="cls1" v-class="classB"></p> classB='cls2' ----><p class="cls1 cls2"></p>
        node.className = className + space + value;
    },
    // v-model指令最终会执行这里代码
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};