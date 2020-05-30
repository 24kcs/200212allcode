// 监视的构造函数 vm,expOrFn---表达式,cd---回调函数
function Watcher(vm, expOrFn, cb) {
    // this----当前的监视的实例对象---Warcher的实例对象
    // 把回调函数保存到cb属性
    this.cb = cb;
    // 把vm实例对象保存到vm属性
    this.vm = vm;
    // 把表达式保存到expOrFn属性中
    this.expOrFn = expOrFn;
    // 把depIds对象存储到当前的Watcher实例对象
    this.depIds = {}; // 用来存储dep对象的id的
    // 判断传入进来的表达式是不是函数?
    if (typeof expOrFn === 'function') {
        // 如果当前的表达式中存储的是函数则保存到this.getter属性中
        this.getter = expOrFn;
    } else {
        // 说明当前的表达式不是一个函数
        // expOrFn.trime（）-----> 把表达式的两端空格干掉----> {{    msg   }}---->'msg'
        this.getter = this.parseGetter(expOrFn.trim());
    }
    // 无论执行的是if还是else,最终,getter属性中存储都是函数

    // 获取当前的表达式的数据-----
    this.value = this.get();
}
// 原型对象
Watcher.prototype = {
    // 构造器
    constructor: Watcher,
    // 更新方法
    update: function() {
        this.run();
    },
    // 执行的方法-------------
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        // 建立dep和watcher对象的关系

        // 判断当前的Watcher实例对象的depIds对象中是否包含当前传入进来的dep的id值

        if (!this.depIds.hasOwnProperty(dep.id)) {
            // Watcher实例对象中如果没有当前的dep的id则把当前的dep的id连同当前的dep对象存储起来
            // this----Watcher的实例对象
            dep.addSub(this);
            //  this----Watcher的实例对象
            // 把dep的id同这个dep对象以键值对的方式存储到当前的Watcher的实例对象中
            this.depIds[dep.id] = dep;
        }
    },
    // 获取表达式的值==============
    get: function() {
        // this-----Watcher的实例对象
        // Dep的target的属性中存储了当前的Watcher的实例对象
        Dep.target = this;
        // 调用getter的方法,改变内部的this指向为当前vm实例对象
        // value中存储的就是msg表达式的值
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        // 返回该表达式的数据值
        return value;
    },
    // 当前的这个方法的作用,获取data对象中所有的属性的值

    // exp----->'msg'
    parseGetter: function(exp) {
        // 判断当前的表达式和正则是否匹配
        if (/[^\w.$]/.test(exp)) return; 

        // 干掉表达式中的. 形成一个表达式数组
        // state.count  data:{ state:{count:10} }
        // exps---->['state','count']
        // vm.state.count

        // msg ['msg']
        var exps = exp.split('.');
        // 回调函数----此时是不执行的------>此时的回调函数是一个返回值
        // obj----vm对象
        return function(obj) {
            // 遍历exps数组中的表达式,并且获取表达式值
            for (var i = 0, len = exps.length; i < len; i++) {
                // 如果vm对象不存在则直接返回
                if (!obj) return;
                // obj---->vm对象
                // obj = vm[exps[0]]
                // obj = vm ['msg']
                // obj = vm.msg 的值
                // obj 中存储的是vm.msg的值----->要访问vm.msg的值---->进入到当前这个属性的get方法内部
                // obj='真香'
                obj = obj[exps[i]];  // 进入MVVM---->进入到observer.js中
            }
            // 返回的是表达式的数据值
            return obj;
        }
    }
};