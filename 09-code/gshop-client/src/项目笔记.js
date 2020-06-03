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
 * 
 * 
 * 
 */