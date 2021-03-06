/*


运行项目: npm run dev 
有部分同学第一次运行项目,直接报错,此时需要执行命令:npm rebuild node-sass
再次运行项目: npm run dev 
此时会出现 浏览器中 同时打开两个界面
解决: 在vue.config.js文件中第37行位置:  open: false 进行设置,
在package.json文件中 "dev": "vue-cli-service serve --open", 进行设置
再次运行项目 : npm run dev
打开浏览器此时出现一个界面,点击左侧列表:商品管理--->平台属性管理菜单,此时浏览器的控制台中报错:
解决: 修改src目录中views目录中product目录中的prop目录修改名为:attr
再次运行项目: npm run dev  解决
此时项目运行正常,如果再次出现错误,应该就是自己电脑缺少相关的软件,百度一下即可解决(项目本身是没有问题了)

1. 导入 和导出 复习

2. 通过swagger 在线工具 测试api接口,地址如下:
http://182.92.128.115:8206/swagger-ui.html#/
3. 测试接口成功后,封装api接口函数


4.路由相关的组件针对当前的这个项目,都放在了views目录中,之前的路由组件都放在了pages目录中



*/
/**
 * 1. 封装接口在api目录中的product目录中新建一个trademark.js文件,里面封装各种接口函数
 * 2. 在api目录中的index.js文件中导出 导入默认暴露的trademark模块
 * 3. 在utils目录中的request.js文件中把baseURL的地址稍微修改一下
 * baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
 * 4. 在APP.vue组件中的mounted中测试接口,如果没有问题的情况(接口测试通过的情况)则进入正式的开发
 * 5. src目录中的view目录就是路由组件的存放目录
 * 6. view目录中的product目录中的trademark目录中的list.vue文件开始进行品牌管理模块的开发
 * 7. trademark品牌模块开发,需要使用element-ui组件库进行开发
 * 8. elelment-ui 中的常用组件:Icon图标/Button按钮/Input输入框/Upload上传/Form表单/Table表格/Message消息提示/MessageBox弹框/Dialog对话框/
 * 9. 组件的注意(重点)建议:常用,常看官方文档,多找例子
 * 复习:
 * Vue中重点面试技术问题总结之一(组件通信的问题)
 * 组件间通信的基本方式:
 * 1.props--------父级组件向子级组件传递数据,子级组件内部使用props进行接收,可以使用
 *   如: 传递属性,传递函数
 *   父子组件之间通信
 * 2.自定义事件方式----父级组件向子级组件传递数据,子级组件内部,分发该事件,从而实现父级组件的相关操作
 *   如: @xxx="回调函数", 子级组件中 $emit('xxx',参数) 分发
 *   父子组件之间通信
 * 3.PubSub------React中可以使用,Vue中可以使用-------任意组件之间通信----插件
 * 4.事件总线----任意组件之间传递数据,需要先在Vue的原型上定义属性,存储的是一个Vue的实例对象
 *   如:  this.$bus.$on()绑定事件   this.$bus.$emit()分发事件
 * 5.插槽
 *  普通插槽 <slot></slot> 插槽没有name属性   父子组件之间通信
 *  具名插槽 <slot name="名字"></slot> 插槽有名字  父子组件之间通信
 *  作用域插槽 <slot :属性="值">   <template slot-scope="scope"></template>  scope是个对象  父子组件之间通信(父子,子父)
 * 6.Vuex
 * 组件间通信的高级方式
 * 1.原生事件/自定义事件
 *  原生事件:
 *    html标签上的事件监听都是原生的(系统自带的)
 *    组件上如果绑定了事件监听,使用了.native
 *  自定义事件:
 *    组件上的事件名字,系统中没有,组件上的事件名字是系统中自带的,但是没有使用.native修饰
 *  原生事件,绑定事件监听后,对应的回调函数会在该事件触发的时候,自动的执行函数内部的代码
 *  自定义事件,绑定事件监听后,对应的回调函数需要手动分发事件的时候,才会执行函数内部的代码
 * 2.v-model
 *  v-model的本质实际上是value属性配合input事件来实现的
 *  在普通标签上,我们可以使用value属性与input事件来实现v-model指定的操作
 *  在组件上,我们使用v-model指令,需要在组件内容,手动的分发input事件,并且需要使用props来接收value属性
 *  在组件上,我们也开始用input事件配合value属性实现v-model指令的效果
 * 3.属性修饰符.sync
 *  通常情况,在某个组件上修改数据的操作的时候,需要先绑定一个动态属性数据,然后定义一个update事件来实现数据变化的操作,组件内部需要使用props接收该动态数据,内部分发update对应的事件,此时,该操作,可以直接使用.sync修饰符(属性修饰符)来实现上述的操作,代码会变的简化
 * 4.$attrs与$listeners
 *  v-bind指令,特殊的用法, v-bind="{属性名字1:属性值,属性名字2:属性值}"
 *  v-on指令 特殊的用法, v-on="{事件名字1:回调函数,事件名字2:回调函数}"
 *  $attrs对象 获取父级组件传递到子级组件中所有的属性,(不包括props,class,style)
 *  $listeners对象 获取父级组件传递到子级组件中所有的事件
 *  上述内容一般配合使用用来封装高级复用的组件
 * 5.$children与$parent
 *  在父级组件内部可以使用$children获取该组件内部所有的直接子级组件
 *  在子级组件内部可以使用$parent获取该组件的直接父级组件
 * 6.作用域插槽slot-scope
 * 插槽,占位的作用,一般情况，不确定该位置显示具体什么内容的时候,但是还需要传递相关的数据,此时可以使用插槽进行占位
 * 同时,插槽标签上可以直接强制绑定动态数据,此时是在子级组件中
 * 在父级组件中通常使用<template slot-scope="scope"> 来获取子级组件(作用域插槽)并且对数据进行控制显示操作,还可以得到插槽内部传递的数据(作用域插槽实现了父向子组件传递数据,子向父组件传递数据)
 * 7. 父级组件AttrList和内部的子级组件CategorySelector要进行通信
 * 子级组件CategorySelector 内部的下拉框的选中内容发生变化,就要通知父级组件,发送请求,获取数据
 * 父子组件之间通信:自定义事件
 * 父级组件调用的子级组件的时候,传入一个自定义事件,及对应的回调函数
 * 子级组件在合适的时机,分发父级组件传递过来的自定义事件,并传入对应的回调函数所需的参数
 * 
 * 
 * 
 */