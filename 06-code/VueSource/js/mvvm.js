// 构造函数,options--->传进来的配置对象
function MVVM(options) {
    // 保存当前的配置对象
    // this是MVVM的实例对象(Vue的实例对象)
    this.$options = options || {};
    // 把当前的配置对象中的data对象分别保存在data变量及_data尚属性中
    var data = this._data = this.$options.data;
    // 把当前的vm实例对象保存到me变量中
    var me = this;
    // 把data变量对象中的所有的属性进行遍历循环操作
    Object.keys(data).forEach(function(key) {
        // 进行数据代理操作----key---->msg
        me._proxyData(key);
    });

    // 计算属性操作---不用进行分析
    this._initComputed();

    // 劫持与监听操作
    observe(data, this);

    // 编辑操作---模版解析操作
    // 创建了编译的实例对象,同时把el('#app')存在则传入,否则传入body标签,还传入当前的vm实例对象
    this.$compile = new Compile(options.el || document.body, this)
}
// 原型对象
MVVM.prototype = {
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 实现数据代理的方法---key--->msg属性
    _proxyData: function(key, setter, getter) {
        // 把当前的vm实例对象存储到me变量中
        var me = this;
        setter = setter || 
        // 为当前实例对象me--->this--->vm 添加属性,key---msg----->vm对象中有了msg属性了
        Object.defineProperty(me, key, {
            configurable: false, // 不能被删除
            enumerable: true, // 当前添加的msg属性可以被枚举
            // 当通过vm对象.msg属性的时候会进入到当前的这个get方法
            get: function proxyGetter() {
                // 直接通过vm._data['msg'] 把该属性的值进行返回
                return me._data[key];
            },
            // 当通过vm对象.msg属性进行赋值操作的时候会自动的进入到这个set方法中
            set: function proxySetter(newVal) {
                // newVal----新的数据值
                // vm._data['msg']=新的值
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};