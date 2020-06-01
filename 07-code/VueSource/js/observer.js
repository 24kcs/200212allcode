// 劫持对象的构造函数,data---->vm中的data
function Observer(data) {
    // 把vm中的data对象保存到当前劫持对象的data中
    this.data = data;
    // 开始执行,并传入vm对象中的data
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    // 进行劫持操作
    walk: function(data) {
        // 保存劫持对象到me变量中
        var me = this;
        // 遍历vm对象中的data对象中所有的属性,key----每个属性---msg
        Object.keys(data).forEach(function(key) {
            // 进行转换操作,并传入属性,和当前这个属性的值:key----msg,data[key]----msg属性的值
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        // 进行转换操作,this.data----当前劫持对象中的data对象,key---msg,val---msg属性的值
        this.defineReactive(this.data, key, val);
    },
    // ----data---->劫持对象中的data,key---msg,val---msg属性的值
    defineReactive: function(data, key, val) {
        // 创建dep对象(data对象中有属性的情况下,创建dep对象(uid,和subs数组))
        var dep = new Dep();
        // 如果data对象中的属性的值还是一个对象,那么就继续的创建劫持对象(内部会继续的创建dep对象)
        var childObj = observe(val);
        // 把vm中的data对象中的每个属性重新的添加到劫持对象中data对象上(劫持对象的data中就有了vm中data对象中所有的属性)
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            // 重写了get(只要你访问的是vm.data中的某个属性就会进入这里)
            get: function() {
                // 判断Dep对象的target属性中是否有值(有值,是Watcher的实例对象)
                if (Dep.target) {
                    // dep对象中有depend方法
                    dep.depend();
                }
                return val;
            },
            // 重写了set(只要是你设置vm.data中的某个属性值,就会进入这里)
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
// 函数----用来劫持数据操作的,最开始的时候value是vm对象中的data变量(data变量存储的是vm.data对象)
function observe(value, vm) {
    // 判断当前的value是不是一个对象
    if (!value || typeof value !== 'object') {
        // 如果不是对象则返回空的
        return;
    }
    // 如果value是对象,中创建劫持对象,并传入value----data(vm中的data)
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    // 添加的watcher对象
    addSub: function(sub) {
        // this---dep对象
        // 把watcher对象添加到dep对象中
        this.subs.push(sub);
    },
    // dep对象的depend方法
    depend: function() {
        // Dep.target----Watcher的实例对象
        // this---dep对象
        // 把dep对象传入进到watcher对象的addDep方法中
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

Dep.target = null;