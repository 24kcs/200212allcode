// 监视对象的构造函数,vm---vm,expOrFn---表达式---msg,cb回调函数
function Watcher(vm, expOrFn, cb) {
    // this----监听对象
    // 保存传入进来的回调函数
    this.cb = cb;
    // 把存当前vm实例对象
    this.vm = vm;
    // 保存传入进来的表达式
    this.expOrFn = expOrFn;
    // 为每个监听对象添加一个新的属性depIds对象===================用来存储id:dep对象
    this.depIds = {};
    // 判断当前表达式是不是一个函数msg----普通的表达式,字符串
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        // this.getter-------> 属性-----回调函数
        // expOrFn---msg表达式字符串格式的'msg'
        this.getter = this.parseGetter(expOrFn.trim());
    }
    // 获取表达式的值,需要通过this.get()调用的结果才能获取表达式的值----msg属性的值
    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    // 把dep添加到watcher对象中,实际上也把watcher添加到dep中
    addDep: function(dep) {
        // dep----就是dep对象
        // 判断当前的watcher对象中的depIds对象中有没有当前的这个dep对象的id,如果没有则开始添加dep
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // this---watcher对象
            // 把watcher对象添加到了dep对象中
            dep.addSub(this);
            // this---watcher对象
            // 把dep对象添加到当前的watcher对象的depIds属性中
            // depIds属性是一个对象, 是把dep的Id值作为键,dep对象作为值,以键值对的方式存储到depIds对象中
            // depIds=====>{0:dep}
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        // this------Watcher的实例对象,保存在Dep的target属性中
        Dep.target = this;
        // value变量=调用对应的回调函数,改变this的指向是vm对象,同时传入vm对象
        // value变量----vm.msg的值
        var value = this.getter.call(this.vm, this.vm);
        // 清空target属性的值
        Dep.target = null;
        // 返回的vm.msg属性的值
        return value;
    },
    // 函数exp------>'msg'
    parseGetter: function(exp) {
        // 当前的正则和表达式是否匹配
        if (/[^\w.$]/.test(exp)) return; 
        // exps----数组[],msg.split('.')----->msg   exps数组--->['msg']
        var exps = exp.split('.');

        return function(obj) {
            // obj-----vm对象
            // 遍历exps数组中存储的每个表达式msg
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                // obj = vm[exps[0]]----exps[0]---->msg
                // vm[exps[0]]----->vm['msg']----vm.msg---->获取msg属性值
                // obj = vm.msg 值
                // 一旦访问了vm.msg---->MVVM.js中的get方法---->Observer.js中的get方法,然后开始建立dep和watcher的关系
                obj = obj[exps[i]];
            }
            // 返回的就是vm.msg的值
            return obj;
        }
    }
};