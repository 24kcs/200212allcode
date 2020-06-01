// 编译对象的构造函数el---#app  vm---Vue的实例对象
function Compile(el, vm) {
    // this----->编译实例对象---->简单的说法--->编译对象
    // 先把vm实例对象存储到编译对象的$vm属性中
    this.$vm = vm;
    // this.isElementNode(el) 判断el是不是一个标签节点,不是,通过document.querySelector(el) 根据选择器获取当前这个标签节点----div(id是app)
    // this.$el ------>div标签节点
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断当前的div存在不
    if (this.$el) {
        // 创建文档碎片对象,同时把div标签中所有的节点全都放在文档碎片对象中
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化文档碎片对象---->模版解析操作
        this.init();
        // 把初始后的文档碎片对象扔进div标签容器中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    node2Fragment: function(el) {
        // 创建文档碎片对象---虚拟DOM
        var fragment = document.createDocumentFragment(),
            child;
        // 把div标签中所有的节点全部的扔进文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 返回文档碎片对象
        return fragment;
    },
    // 初始化模版---模版解析操作,自己啥也没有,内部调用的是真正的初始化模版的操作
    init: function() {
        // 初始化模版操作,并传入文档碎片对象
        this.compileElement(this.$fragment);
    },
    // 模版解析操作,
    compileElement: function(el) {
        // el----文档碎片对象
        // 获取的是文档碎片对象中的所有的节点
        var childNodes = el.childNodes,
        // 把当前的编译对象存储到了me变量中
            me = this;
        // 伪数组转真数组,把所有的节点进行循环遍历操作,node----每个节点
        [].slice.call(childNodes).forEach(function(node) {
            // 获取当前的这个节点的文本内容
            var text = node.textContent;
            // 插值语法的正则表达式
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的这个节点是不是标签节点
            if (me.isElementNode(node)) {
                // 如果是标签节点,开始对标签节点进行解析操作,node---button
                me.compile(node);

                // 判断当前的节点是不是文本节点,同时这个文本节点是否满足正则插值语法的表达式
            } else if (me.isTextNode(node) && reg.test(text)) {
                // me----当前编译对象,node---当前的节点,RegExp.$1.trim()----msg
                // 编译文本节点操作---(插值的表达式的编译操作)
                // node---{{msg}}   
                me.compileText(node, RegExp.$1.trim());
            }
            // 如果当前的节点还有子节点,并且该节点的子节点的个数是大于0的
            if (node.childNodes && node.childNodes.length) {
                // 递归操作,节点中的节点继续的遍历
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // node---button
        // 获取当前按钮标签节点的所有的属性
        // nodeAttrs----->'v-on:click="showName"'
        var nodeAttrs = node.attributes,
        //me---当前的编译对象
            me = this;
        // 遍历所有的属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 获取属性的名字
            // attrName----->'v-on:click'
            var attrName = attr.name;
            // 判断当前的属性是不是指令
            if (me.isDirective(attrName)) {
                // 获取该属性的值----'showName'
                var exp = attr.value;
                // 获取指令----div-----on:click
                var dir = attrName.substring(2);
                // 判断当前的指令是不是事件指令
                if (me.isEventDirective(dir)) {
                    // node----button,      me.$vm---vm   exp---showName    dir-----on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 是一个普通指令
                } else {
                    // dir ----'text'  exp----'msg'
                    // dir -----'html'  exp----'msg'
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 干掉当前指令上所有的属性
                node.removeAttribute(attrName);
            }
        });
    },
    // node---当前节点---{{msg}},exp-----msg
    compileText: function(node, exp) {
        // 编译工具对象调用内部的text,要对插值文本进行编译操作
        // node---{{msg}},this.$vm---vm,exp---msg
        compileUtil.text(node, this.$vm, exp);
    },
    // 判读昂当前的属性是不是指令
    isDirective: function(attr) {
        // 属性中是不是v-开头
        return attr.indexOf('v-') == 0;
    },
    // 判断当前的指令是不是事件指令
    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },
    // 判断当前的节点是不是标签节点
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 判断当前的节点是不是文本节点
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    //  v-text指令
    // node----{{msg}},vm--vm,exp---msg
    text: function(node, vm, exp) {
        // 调用bind方法,传入{{msg}},vm,msg,'text'
        this.bind(node, vm, exp, 'text');
    },
    // v-html指令
    html: function(node, vm, exp) {
        // node-----p   vm    exp----msg
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
    // v-class指令------v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },
    // node----{{msg}},vm--vm实例对象,exp---msg, dir---->'text'
    bind: function(node, vm, exp, dir) {
        // updater是对象
        // updater['textUpdater']---->updater.textUpdater
        // updaterFn是个函数
        var updaterFn = updater[dir + 'Updater'];
        // 判断该函数存在,存在则调用,node---{{msg}},
        //  this._getVMVal(vm, exp)  vm,exp----msg
        // 调用该函数updaterFn ,传入{{msg}},和msg属性的值
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 只要有一个表达式,就会创建一个watcher对象
        // vm,exp---msg表达式,第三个参数是一个回调函数
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理  // node----button,      vm   exp---showName    dir-----on:click
    eventHandler: function(node, vm, exp, dir) {
        // eventType---->click 
        var eventType = dir.split(':')[1],
        // fn是vm对象中的methods对象中showName回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 判断click事件类型存在及showName回调函数存在
        if (eventType && fn) {
            // 为node---button 绑定事件,eventType----click ,fn.bind() ---复制一份,同时改变内部的this指向为vm实例对象,false---事件冒泡
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    // 根据vm对象和msg属性,从vm对象中获取msg属性的值
    _getVMVal: function(vm, exp) {
        // val是变量,一开始 存储的是vm实例对象
        var val = vm;
        // 'msg'.split('.')
        // exp---数组--->['msg']
        exp = exp.split('.');
        // 遍历数组,k---'msg'
        exp.forEach(function(k) {
            // val变量===vm['msg']---->vm.msg属性的值----获取该属性的值,自动的进入vm中的get的方法(Object.defineProperty()方法中的get方法)

            // val存储的是vm.msg属性的值
            val = val[k];
        });
        // 返回msg该属性值
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


var updater = {
    // v-model或者v-text指令最后的解析操作方法
    // 插值的文本进行解析操作node---'{{msg}}',value----msg属性的值
    // node----p  value---->vm.msg属性的值
    textUpdater: function(node, value) {
        // 设置当前文本节点的文本内容,
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html指令解析的方法,node----p,value---->vm.msg属性的值
    htmlUpdater: function(node, value) {

        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    // v-class指令的解析方法
    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';
        // p.className= 'cls2'+' '+'cls'
        // p 的class ="cls2 cls"
        node.className = className + space + value;
    },
    // v-model指令解析的方法
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};