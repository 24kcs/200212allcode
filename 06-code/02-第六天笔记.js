/**
 * Vuex的store对象一旦在main.js中进行注册了
 * 所有的组件的实例对象中都会出现一个$store的对象
 * 在store.js文件中创建store对象的时候定义了mutations和actions对象中,
 * 如果想要在actions中使用某个mutation,那么就用commit()
 * 如果想要在组件中找某个mutation,那么用$store对象.commit('某个mutation')
 * 如果想要在组件中找某个action,那么用$store对象.dispatch('某个action')
 * 在组件中想要获取状态数据:$store.state.状态数据
 * 在组件中想要修改某个状态数据:
 *  1) $store.commit('某个mutation')
 *  2) $store.dispatch('某个action')
 * 组件---->修改状态数据---->action--->mutation--->修改state中的数据
 * 
 * 只要是用commit,那么找的就是mutation
 * 只要是用dispatch,那么找的就是action
 * 
 * 在组件内部如果想要获取状态数据,通过计算属性的方式来获取状态数据,那么可以使用Vuex中的辅助函数,通过拆包的写法来简化代码
 * 
 * 在组件内的methods对象中,如果想要使用对应的mutation或者对应的action,可以使用辅助函数mapMutations和mapActions,进行代码的简化
 * 
 * 
 * 面试题:
 * 1.项目中为什么要用Vuex, 我们老大说要用
 * 2.你项目中为什么不用Vuex,项目不大,管理的状态数据不多,老大说没有必要.(您问我的项目是个微信小程序,太小了,没有必要)
 * 3.项目中什么情况使用Vuex,状态数据比较多,管理起来为了方便,
 * 4. 项目一开始没有用vuex,后来发现状态数据太多,多个组件之间的通信太麻烦,所以.....
 * 
 * 5. 我看您的简历中平时会看看一些论坛,简书,知乎,掘金，获取github源码...关注过哪些大牛
 * 
 * 
 * 
 */


 /*

   面试题1: 如何理解Vue中的数据代理
    首先Vue中是有数据代理,数据代理的实现原理无非就是在实例化Vue的时候,通过传入的配置对象,获取里面的data对象,并且遍历data对象中所有的属性,通过forEach循环遍历,把每个data中的每个属性及值通过Object.defineProperty()方法添加到vm的实例对象中,并且重写内部的get方法及set方法
    外部通过vm.属性获取值的时候会自动的进入到get方法,并且从data对象中把该属性的值返回
    外部如果通过vm.属性赋值的时候,会自动的进入到set方法,并且把该值会写入到data对象中的该属性上,以上就是Vue中的数据代理
    vm是代理者,data是被代理者,有了数据代理后,通过vm实例对象可以快速的访问data中定义的属性或者说数据,非常的方便

    面试题2:如何理解Vue中的模版解析之表达式
  */