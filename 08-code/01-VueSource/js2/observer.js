// data---->vm对象中的data(实际上是vm的实例对象中的一个data变量存储的这个vm的data对象)
// 劫持的构造函数
function Observer(data) {
    // 劫持对象中的data属性存储了vm的data对象数据
    // 把vm中的data对象数据存储到了当前的劫持对象的data属性中
    // this.data和data指向相同
    this.data = data;
    // 开始执行---开始劫持数据,并且创建dep对象(依赖关系---->创建依赖关系),传入vm中的data数据对象
    this.walk(data);
}
// 劫持的原型对象
Observer.prototype = {
    // 构造器
    constructor: Observer,
    // walk方法--->data---->vm中的data数据对象(var data=vm.data)
    walk: function(data) {
        // me---->劫持对象
        var me = this;
        // 获取data数据对象中的所有属性并且遍历,key===='msg1'
        Object.keys(data).forEach(function(key) {
            // 转换数据的操作----->key----'msg1'名字,data[key]---->data['msg1']---->data.msg1 该属性的值
            me.convert(key, data[key]);
        });
    },
    // 转换数据:key----'msg1',val---'真香'
    convert: function(key, val) {
        // 定义数据(转换数据,并且定义)
        // 为当前的劫持对象中的data重新定义数据
        // this.data----->劫持对象.data   key====='msg1'   value===='真香'
        this.defineReactive(this.data, key, val);
    },
    // 定义数据的同时进行数据转换
    // data---劫持对象.data  key====='msg1'   value===='真香'
    defineReactive: function(data, key, val) {
        // 创建dep对象(id,subs数组(消息订阅))
        var dep = new Dep();
        // observe('真香')---如果当前的这个data对象中的属性的值不是一个对象
        // 如果val是一个对象的情况下,那么我就继续的创建dep对象
        var childObj = observe(val);

        // data----当前的劫持对象的data  key====='msg1'
        // 一开始的时候劫持对象中的data---->指向了vm中的data了(两个对象的指向是相同了)
        // 重写,我要重新的把vm中的data的属性添加到劫持对象的data对象中()
        // 把vm中的data中的属性一个一个的添加到当前的劫持对象的data中
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            // 重写get方法和set方法

            // 如果有一天你用到了data对象中的属性的时候,那么就会进入到当前的get方法或者是set方法
            get: function() {
                // Dep.target中是有数据的============Watcher的实例对象
                if (Dep.target) {
                    // 说明此时Dep.target属性中不是空(那就是有值的情况,才进入if判断)
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};
// 劫持数据的方法,value--->data对象,vm---->Vue的实例对象(MVVM)
function observe(value, vm) {
    // 判断value是否有数据(没有数据)或者value不是一个对象
    if (!value || typeof value !== 'object') {
        return; //啥也不是
    }
    // 此时能够执行下面这行代码,说明,value是一个非空对象
    // 如果value是一个非空对象,则创建Observer的实例对象(劫持实例对象),并传入value(暂且此时value是data对象)
    return new Observer(value);
};

// dep的唯一标识---id值
var uid = 0;
// Dep 的构造函数(要产生依赖关系的)
function Dep() {
    // dep 的 id 标识
    this.id = uid++;
    // 创建一个消息订阅的数组(暂时不解释)
    this.subs = [];
}
// 大的Dep的原型对象
Dep.prototype = {
    // 把watcher对象添加到当前对应的dep对象中
    // sub就是Watcher的实例对象
    addSub: function(sub) {
        // this---dep对象,sub---------- Watcher的实例对象
        // 把Watcher实例对象添加到当前的dep的subs数组中
        this.subs.push(sub);
    },
    // ============================= 开始建立dep和watcher对象的联系  (Watcher的实例对象)
    depend: function() {
        // Dep.target中存储的是Watcher的实例对象
        // watcher.addDep(dep对象)
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
// 目标属性,默认为null
Dep.target = null;