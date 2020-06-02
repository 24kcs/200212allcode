// MVVM相当于Vue,options就是配置对象
function MVVM(options) {
    // 判断options对象是否存在,如果不存在把空对象给$options属性,如果存在就直接存储到$options属性中
    this.$options = options || {};
    // 把data对象存储到了两个地方,一个是data变量,一个是_data
    var data = this._data = this.$options.data; // data 就是Vue的配置对象中的data
    // this当前的Vue的实例对象,存储到了me变量中
    var me = this;

    // 数据代理---真正的实现的代码,获取data变量(内部存储的是对象),遍历操作,找到每个属性
    Object.keys(data).forEach(function(key) {
        // 下面的代码才是最根本的实现数据代理的操作

        // me---this(Vue实例对象).数据代理的方法(传入的是msg)
        me._proxyData(key);
    });

    this._initComputed(); // 计算属性的初始化----不分析
    // 劫持和消息订阅
    // data是一个变量(对象,存储的是vm实例对象中的data属性),this----vm实例对象
    // 调用observe 方法传入data对象,和vm实例对象
    // 劫持数据
    observe(data, this);
    // 模版解析
    // 创建编译对象的时候,传入了el选择器或者传入了body标签对象,还有当前的vm这个实例对象
    this.$compile = new Compile(options.el || document.body, this)
}
// Vue的原型对象
MVVM.prototype = {
    // 指定的是构造器是Vue
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 这是为原型对象上添加的一个实例方法----需要通过vm来访问
    _proxyData: function(key, setter, getter) {
        // 再次把vm实例对象保存到me变量中
        var me = this;
        setter = setter || 
        // 为vm实例对象添加msg的属性------>vm.msg,并且重新的设置的配置信息
        Object.defineProperty(me, key, {
            configurable: false, // 是否可以重新设置该属性
            enumerable: true, // 当前的属性可以进行遍历
            // 重写了get
            get: function proxyGetter() {
                // me--vm对象._data中key---->vm._data['msg']   如果你要访问vm.msg属性实际上是从vm._data.msg中获取的
                // 只要是想获取msg属性必然会进入到这个get方法内部,
                // vm._data['msg']
                return me._data[key];
            },
            // 重写了set
            set: function proxySetter(newVal) {
                // 只要是想设置或者说为msg属性赋值,必然进入到这个set方法内部
                // newVal---新的值给me--vm实例对象----vm._data['msg']=新的值
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