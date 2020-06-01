/**
 * 
 * 1. 复习
 * Vuex:集中式管理状态数据,是一种模式
 * npm install vuex
 * Vue.use(Vuex) 声明使用插件
 * 
 * state: 包含了多个状态数据的对象
 * mutations:包含了多个直接修改状态数据方法的对象
 * actions:包含了多个间接修改状态数据方法的对象
 * getters:包含了多个状态数据的计算属性的get方法的对象
 * mutations中的每个方法都是一个mutation,每个mutation都有自己的type,每个mutation的方法名字就是当前这个mutation的type
 * type是可以定义成常量然后进行使用的
 * actions中的每个方法都是一个action
 * mutation中都是同步的方法,action中的方法可以是同步的也可以是异步的
 * action的方法中的第一个参数是一个对象,相当于store,如果想要调用mutation,那么需要通过commit,如果想要调用action,那么需要通过dispatch
 * 组件内使用Vuex:
 * 如果想要在组件内获取状态数据,可以通过$store.state.属性或者在计算属性中通过辅助函数mapState() 
 * 如果想要在组件内获取状态数据的计算属性,可以通过$store.getters.属性或者通过辅助函数mapGetters()
 * 如果想要在组件内调用mutation,那么可以通过$store.commit('mutation的type')或者通过辅助函数mapMutations(['mutation的type'])
 * 如果想要在组件内提交action,那么可以通过$store.dispatch('action的名字')或者通过辅助函数mapActions(['action的名字'])
 * Vuex中还有一个对象modules,拆分模块的方式,后面讲(项目中)
 * 
 * Vue的源码分析:
 * 面试题: 如何理解Vue中的数据代理
 *   首先Vue中是有数据代理,数据代理的实现原理无非就是在实例化Vue的时候,通过传入的配置对象,获取里面的data对象,并且遍历data对象中所有的属性,通过forEach循环遍历,把每个data中的每个属性及值通过Object.defineProperty()方法添加到vm的实例对象中,并且重写内部的get方法及set方法
 *   外部通过vm.属性获取值的时候会自动的进入到get方法,并且从data对象中把该属性的值返回
 *   外部如果通过vm.属性赋值的时候,会自动的进入到set方法,并且把该值会写入到data对象中的该属性上,以上就是Vue中的数据代理
 *   vm是代理者,data是被代理者,有了数据代理后,通过vm实例对象可以快速的访问data中定义的属性或者说数据,非常的方便
 * 
 * Vue中的模版解析之插值语法的解析:
 * 
 * 
 * 
 * 
 * 2. 课程介绍
 * Vue的源码(先调试代码,写注释,总结思路(面试题))画----劫持和监视图
 * stylus的使用
 * stylus的小案例(练习stylus的使用)
 * Vue的第一个项目(前台电商)
 * 
 * 3. 开始讲解
 * 
 * 
 */