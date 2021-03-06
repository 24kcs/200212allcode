/**
 * 1. 通过脚手架3下载项目模版
 * 2. package.json 文件中设置 --open
 * 3. 干掉src目录中没用的文件
 * 4. 设置App.vue中的样式是通过less的方式设置
 * 5. 下载相关的插件 npm install vue-router axios vuex less less-loader
 * 6. 在src目录中新建一些目录
 * api----存储axios 用来做异步操作的相关的文件(index.js----api的接口函数----ajax.js----封装请求拦截器和响应拦截的)
 * components---普通组件的
 * mock----mockjs的文件的
 * pages----路由相关的组件
 * router----路由的注册及配置的
 * utils----封装的工具函数或者对象
 * store----vuex
 * 
 * 
 * 7. 拆分静态页面,Header组件和Footer组件两个普通组件
 *  中间主体的部分---Home组件----路由组件
 * 
 * 8. 编程式路由进行跳转,push方法或者replace方法出现bug的解决方式:
 * 
 * 
 * 9. 编程式路由跳转并传递参数的不同写法
 * params:首先需要在注册路由组件的时候,设置:keyword进行占位
 * this.$router.push(`/search/${this.keyword}`)    字符串的写法
 * 
 * query:注册路由的时候,正常的写法,不需要设置:进行占位
 *  this.$router.push(`/search?keyword=${this.keyword}`)   字符串的写法
 * params 传参可以使用对象的写法:
 *  需要在注册路由组件的时候,占位,同时设置name属性
 *  this.$router.push({ name: 'search', params: { keyword: this.keyword } })
 * query 传参可以使用对象的写法:
 *  需要在注册路由组件的时候, 不用占位,也不用设置name属性
 *  this.$router.push({path:'/search',query:{keyword:this.keyword}})
 * 总结:query的对象写法中也可以使用name属性的方式,但是params的对象写法中不可以使用path的属性的方式的
 * 
 * 
 * 跨域:
 * 通过脚手架启动项目的时候,默认会有一个服务器,以localhost:8081 这种形式打开当前页面,想要通过一部请求访问另一个服务器的地址获取相关的数据,此时是当前浏览器想和另一个服务器进行交互,出现了无法正常访问的问题(服务器和服务器不存在跨域问题,当前的浏览器用到了当前的服务器,浏览器和另一个服务器的交互的问题)
 * 通过webpack的使用正向代理的方式来解决跨域
 * 正向代理是当前的服务器代理的是当前的浏览器(客户端)向另一个服务器发送请求
 * 反向代理是客户端访问某个服务器获取相关的数据操作(类似于这样的操作,交互行为),此时你访问的服务器并不是真正的服务器,而是一个代理的这个服务器,这个服务器代理的是真正的服务器
 * 
 * 脚手架3中的跨域问题
 * 在vuex.config.js文件中进行配置devServer对象中配置
 * 脚手架2中的跨域问题
 * 在config目录中的,index.js文件中的,proxyTable:{}对象中进行跨域的配置
 * 脚手架2/3中的eslint语法检查的配置
 * 脚手架2中: 在.eslintignore文件中或者eslintrc.js中对eslint语法进行关闭操作
 * 脚手架3中: 在package.json中的"rules": {} 关闭相关的eslint语法检查,或者在vue.config.js文件中进行配置的方式关闭eslint语法检查
 * 
 * 
 * 
 * 在组件内部通过调用api接口函数,获取服务器响应回来的数据,有可能会在其他的组件中使用,涉及到组件之间通信的问题
 * 任意组件之间进行传递数据----组件之间的通信
 * 事件总线,消息订阅,Vuex----
 * 
 * 
 * Vuex的模块化操作的原因:将来有很多的状态数据,会让实例化Vuex.Store()的时候内部的这个中代码显得很臃肿
 * Vuex中一共实际上有5个对象,state,mutations,actions,getters ,但是还有一个是modules---Vuex的模块化操作
 * 每个模块中都可以有Vuex中前面的四个对象,最终把这个四个对象一起暴露出来,然后在modules对象中引入即可,就形成了Vuex的模块化操作
 * 为了方便统一管理Vuex中的这些状态数据,并且和原来的state,mutations,actions,getters不冲突的情况下,采用了modules模块化操作,最外面的state,mutations,actions,getter这些都可以叫总的,什么意思?
 * 总的  这些可以删除,但是也可以不删除
 * state----总的state
 * mutations---总的mutations
 * ations---总的actions
 * getters---总的getters
 * 模块中的state,mutations,actions,getters,这些都是模块中的
 * 1)Vuex模块化后数据该如何的获取
 * this.$store.总的state.模块的名字.状态数据
 * this.$store.state.home.baseCategoryList---获取数据
 * 在组件内部的一些方法中通过js代码的方式来获取
 * 在组件内部的html模版中如何获取?----先通过计算属性的方式来获取,然后再使用
 * 首先引入Vuex的辅助函数,然后通过计算属性
 *  baseCategoryList:state对象=>state对象.home模块.baseCategoryList
 * 2)举例:总的actions中有个showMsg方法,某个模块中也有一个showMsg的方法,相同的方法该如何的使用
 * 先调用的是总的actions中的方法,然后再调用模块中的actions中的方法
 * 先总后模块,先找总的actions中的这个方法,如果没有则好模块中的actions中的方法,如果模块中也没有则报错
 * 
 * 
 * ==================================
 * 
 * 问题1: 点击分类信息跳转到search界面,同时传递参数
 * /search?categoryName=手机&category1Id=2
 * /search?categoryName=手机通讯&category2Id=13
 * /search?categoryName=酒柜&category3Id=99
 * 
 * 每次点击不同分类信息 跳转到search界面
 * 必然传入一个categoryName的数据,和 category1Id  ||  category2Id   ||   category3Id
 * categoryName和(1||2||3)的id值
 * 
 * 通过router-link的方式实现了路由跳转及传递参数数据,但是产生了大量的router-link,页面出现了卡顿的效果=====
 * 解决:继续使用以前的a标签的方式,但是不需要为所有的a标签绑定点击事件监听,原因是如果这么作为(所有的a都绑定点击事件,还是会造成大量的a绑定事件,造成代码的冗余,主要的问题是:vue在渲染的过程中大量绑定事件，渲染的效率还是很低),通过事件委托的方式只为最外层的div绑定点击事件,其他标签的点击操作也会触发该点击事件。最终是希望只点击a标签才实现跳转,如何解决呢?
 * 
 * 
 * 
 * 
 * 问题2: 分类列表,鼠标进入的时候,此时该事件可以被触发n次-----没有必要====函数的防抖或者节流的方式
 * 采用函数节流的方式来解决该问题
 * 引入lodash插件,调用内部的throttle方法使用函数节流(实现了按需引入的方式来优化代码)
 * 
 * 希望在标签中存储数据
 * 在标签中自定义属性来存储数据
 * <p index="10"></p>
 * 通过js来获取的时候 DOM的p对象.getAttribute('index')---->该属性的值
 * HTML5中为了方便获取自定义属性存储的数据
 * <p data-index="10"></p>
 * 通过js来获取的时候  DOM的p对象.dataset对象---->index属性的值
 * dataset的方式,里面的属性都会变成小写的
 * 
 * 
 * 每次进入到一个新的界面后,只要该界面中有TypeNav组件,那么就会发送一次异步请求,重新获取分类信息数据
 * 该分类信息数据,只获取一次就足够了,
 * 优化异步请求的操作
 * 
 * 
 * 
 * 
 */