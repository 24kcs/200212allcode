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
 * 
 * vuex中有什么样的对象,modules对象中就可以有什么对象-----
 * 
 * 
 * 
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
 * 目的:搞定轮播图
 * 设计数据json
 * mockjs
 * swiper
 * 拆分组件---全局公共组件
 * 实现轮播图
 * 
 * 
 * 
 * ==========================================
 * 第三天
 * 
 * 1. 分析ListContainer组件和Floor组件内部都有轮播图
 * 1)轮播图的数据应该是动态的数据
 * 在组件内部调用异步action,发送请求,获取轮播图的数据,组件内通过vuex获取响应回来的数据,动态的显示到页面中
 * 2)Floor组件内部的数据也是动态的数据
 * 在组件内部调用异步action,发送请求,获取Floor的相关数据,组件内通过vuex获取响应回来的数据,动态的显示到页面中
 * 
 * 组件内动态的获取数据----->调用异步action---->vuex中应该有状态数据----->调用接口函数--->发送请求----api函数----后台提供api接口----对应的数据
 * 
 * 
 * 
 * 目的:获取数据展现在页面中
 * 目前:
 * 现在没有轮播图的数据,也没有floor的数据
 * 
 * 前端程序员 ---->调用接口函数----->后台程序员提供api接口
 * 
 * 项目---前端程序员和后台程序员配合开发出来
 * 
 * 设计数据---->调用接口--->发送请求---获取数据,显示到页面中==========
 * 
 * 自己设计数据(最后和后台肯定是吻合的)
 * 
 * 经典的面试题： 自己实现登录操作,帐号:admin,密码88888 ,帐号和密码如果正确则跳转显示登录成功,否则提示帐号或者密码错误(搭建服务器,设计数据,通过脚手架2/3的进行搭建项目,自己搭建界面,实现异步操作,路由组件的注册)
 * 
 * 
 * 设计数据,主要参考平时调用接口返回的数据,进行设计
 * 设计数据------>js中存储---->number,string,boolean,array,object
 * 最方便的方式来存储数据的类型,应该是array或者object
 * 存储数据的文件:.json文件
 * 不知道存储多少个数据,用数组来存储
 * 一般情况为了数据操作起来方便,使用对象来存储数据
 * .json文件----->[{},{},{}]
 * 
 * 轮播图的数据设计方式
 * [
 *    
 *    
 *   {
 *     'id':'1',
 *      imrUrl:'./images/1.jpg'
 *   }
 * ]
 * 不可以修改      可以修改
 *    键      :     值
 * 键----结构的类型---不能被随便修改的
 * 键---结构类型
 * 值---结构的值
 *   "id":"1",
 *   "imgUrl":"./images/1.jpg"
 * 
 * 楼层的数据
 * 
 * {
 *   "title":"家用电器",
 *   "keywords":[
 *     {
 *       "keyword":"节能补贴",
 *       "id":"1",
 *       "url":"http://localhost:8080"
 *     },
 *     {
 *       "keyword":"节能补贴",
 *       "id":"1",
 *       "url":"http://localhost:8080"
 *     }
 *   ]
 * }
 *
 * 
 *  
 * 
 * 设计数据---->调用接口--->发送请求---获取数据,显示到页面中==========
 * 数据---在本地----调用接口--->设计接口
 * 如果把本地的数据,通过接口的方式来获取
 * 
 * 
 * 最终 ：步骤:
 * 组件内部提交action---->调用接口---->发送异步请求--->获取数据--->提交mutation--->更新Vuex中的状态数据--->组件内部通过Vuex获取数据--->遍历数据--->展现数据
 * Vuex管理banners数据和floors数据
 * 
 * 页面中的轮播图是没有效果,实现轮播图的效果,然后再遍历数据--->展现数据
 * 
 * ListContainer和Floor组件中都要展现轮播图的效果
 * 安装swiper插件,同时引入其样式文件
 * 复制swiper的html结构代码
 * 在页面加载后创建Swiper对象,并传入选择器及配置对象,打开页面后有轮播图的效果了
 * 此时展开页面有bug存在,卡或者连续漂浮的方式切换图片
 * 
 * 轮播图最外面的div的类样式的名字:swiper-container
 * 创建Swiper对象的时候,第一个参数的选择器:.swiper-container
 * Floor组件内部的轮播图的html结构中的类样式的名字:swiper-container
 * 
 * 在组件内部,通过计算属性的方式内部调用vuex辅助函数,获取banners数据后,页面中的轮播图挂了,不能正常的滑动,无法显示轮播图效果----bug
 * 
 * 在Vue中组件之间的关系父子关系(直接/间接),兄弟关系
 * 父子关系的组件,在页面中渲染的时候,应该是先把子级组件渲染出来,然后再渲染父级组件
 * Home组件是父级组件,ListContainer组件是子级组件
 * ListContainer组件内部应该先有swpier的html渲染完毕后,然后再创建Swiper对象,才有轮播图的效果
 * 现在:
 * 父级组件Home加载后才能发送异步请求,不太可能发完异步请求就可以直接获取了数据(发送请求的时候,过了一小会(时间很短)---数据就获取到了),而在Home父级组件渲染之前,子级组件ListContainer已经渲染完毕了,里面的Swiper对象也已经创建完了,但是数据还没有拿到,也就是说,swiper标签结构中的显示图片的标签因为是使用v-for的指令,数组中没有数据,此时标签不会被创建,但是swiper已经创建完了,此时再获取数据也已经没有效果了--------原因
 * 
 *  解决方式1:
 *  通过定时器,延迟Swiper对象的创建,可以的,但是,延迟多长时间是不能确定
 * 
 * 解决方式2:watch
 * 通过watch对象监视banners数据,一旦发生变化后,再去创建Swiper的对象
 * 使用watch监视数据,无非就是等到数据发生了变化,也就是DOM已经渲染完毕了,就创建Swiper的对象
 * 监视数据的过程中,只要数据发生了变化,DOM渲染了,那么就创建Swiper对象就可以实现轮播图的效果
 * 解决方式3: nextTick()方法/$nextTick()
 * .nextTick()是Vue的,$nextTick()是vm实例对象,用谁都可以调用
 * 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
 * 
 * 
 * 面试题:使用swiper插件的时候遇到过什么问题,或者说项目中遇到了什么问题?
 * 
 * 
 * 
 * 1. Floor组件中需要使用动态的数据(Home组件中已经提交action,获取到了,在Vuex中)
 * 2. 抽取轮播图组件为全局的公共组件(全局组件)
 * 3. 轮播图的bug----很重要----面试题:项目开发中遇到过什么样的难点
 * 4. 测试搜索的接口---封装api函数,-----vuex封装-----组件中使用该接口
 * 
 * 
 * 
 * 
 * 
 * 
 */

 /*

当前Carousel 组件如果被创建了(被使用),此时必然会执行mounted这个生命周期回调
mounted回调执行了三次,说明被使用了3次
ListContainer组件内部使用过一次该组件,该组件肯定是被创建了(被使用),所以,mounted肯定会执行一次-----1次
Floor组件内部使用过一次该组件,该组件也被创建使用过了,mounted回调肯定会执行一次,但是Floor组件被v-for指令遍历过(通过循环遍历了,遍历了2次)----所以,Floor组件被遍历的同时,内部的Carousel组件就被使用过-----2次
Carousel组件的mounted生命周期回调函数就执行了三次===================


以下是分析的结果:---没有错,只不过这里的bug就可以解释这个问题
第一次的时候Carousel组件被使用是在ListContainer组件内部,轮播图的数据有4个-----
this.carouselList.length----------------------------4个
第二次和第三次的时候Carousel组件被使用是在Floor组件内部,每个floor组件内轮播图的数据有3个(一共有6个数据)-----
this.carouselList.length----------------------------3个,3个
mounted回调执行结果: 4  3  3

实际上的结果: 0  3  3----肯定是对的


2.ListContainer组件中 Carousel组件 是如何创建的
一开始ListContainer组件中使用了Carousel组件,内部是通过:carouselList="banners" 是传入了这个属性,注意的问题,此时banners数据有没有都不会影响Carousel组件的创建,一开始banners没有数据,但是Carousel组件可以正常的创建出来(此时的banners数据要么在请求的路上,要么在响应的路上,总是此时的banners是没有数据的,但是Carousel组件正在开始创建了),一旦Carousel组件被创建,就会进入到mounted回调中,此时该组件中被传入的banners由于没有数据,所以,this.carouselList.length----0个=================================坑
此时banners传入到了Carousel组件中,内部通过props接收,存储到了carouselList数组中,但是没有数据,没有数据,轮播图怎么会显示出来呢------大坑1
一开始组件创建,没有数据,数据就是0,但是此时异步请求正在发送中,组价创建出来后,数据也差不多响应回来了,此时组件中的carouselList数组的数据就会发生变化,一旦变化,就会进入watch中,里面的数据就发生了变化,页面就会更新,Swiper对象就会创建,轮播图的效果就出来了---坑没了




1.Floor组件中 Carousel组件 是如何创建的
Floor组件是在Home组件中使用的,但是Floor组件在创建的时候，或者说该组件在使用的过程中 用到了v-for指令,这是问题的关键
Floor组件中的v-for指令的遍历条件是一个数组,如果该数组有数据,则可以进行遍历操作,既然可以遍历操作,那么Floor组件就可以被创建出来,一旦被创建出来,就说明可以使用该组件了,那么mounted回调就可以被执行,但是,如果v-for指令遍历的数组条件不成立(该数组没有数据,则无法创建该组件Floor)
Floor组件中v-for指令中的floors这个数据是一个数组,该数组一开始没有数据(也就意味着Floor组件是不会被创建的),为什么?
原因是,Home组件内部所有的html结构只有在页面中渲染完毕后(加载后---能够看到页面中的内容,已经显示出来了),mounted生命周期回调才能执行(内部的代码才开始执行),发送异步请求的action(获取floors数组的)才开始提交,这个时候floors数组是没有数据的,但是页面已经渲染完毕了,只不过Floor组件是没有的,那么此时获取floors的数据要么在请求的路上,要么就是在响应的路上,此时floors数组数据已经请求回来了,那么v-for指令遍历的条件就有了,有了之后,可以创建Floor组件了,该组件一旦被创建,那么mounted就会执行,既然是在组件创建后(页面已经加载了)执行了mounted,就说明此时的floors肯定是有了数据后才创建的组件,所以,mounted回调中的this.carouselList.length----------------------------3个,3个
Floor组件能被渲染说明floors数组有数据,既然如此内部用到的Carousel组件也可以被渲染,既然可以被渲染,该组件内部接收的轮播图数据就是3个3个====================================================================================================================================坑
Floor组件中既然有数据,为什么轮播图不能正常的显示出来----大坑2
一开始组件没有被创建,也没有数据,后来通过异步请求的方式获取到了数据,既然有数据,那么组件就会被创建,说明组件在创建的时候数据就已经存在,所以,组件出现在页面的时候,已经加载完了,mounted中就有了数据,既然组件已经创建完毕,数据也都有了,那么数据此后再也没有变化过(此时的数据是3个,只不过渲染了2次),既然如此,就不会进入到watch中(最开始的时候数据就是3个,从来没有变化过,所以不会进入到watch中),那么Swiper对象也不会被创建,所以,轮播图就没有效果


而且watch为什么就执行了一次-----大坑3---原因就是一开始大轮播图的数据是0个,后来根据发送的请求响应回来的数据变化了,就会执行watch中代码,而Floor组件内部的轮播图数据一开始就有,后面没有发生过变化,所以,就不会进入到watch中

结果:mounted执行了3次,watch执行了一次
解决:让watch监视的时候,立刻执行回调,----最少应该执行3次




组件上使用了指令,不一定因为用到了指令组件渲染就有条件,要看当前的指令是否需要什么条件才能执行
例如: <p v-for="item in items"></p>



*/


/*

1. 拆分Search组件 ✔

2. 测试接口---✔

3. 分析该接口内部的参数数据 ✔
category1Id: ''   一级分类id
category2Id: ''   二级分类id
category3Id: ''   三级分类id
categoryName: ''  分类的名字
trademark: '245:华为'  '品牌id:品牌的名字'
order:  '1:desc' 排序的方式   1---综合, 2---价格, asc---升序   , desc---降序
pageNo: 1    当前第几页
pageSize: 5  每页显示多少条数据
keyword:''  搜索关键字
props:['383:6.75-6.84英寸:屏幕尺寸", "385:16GB:机身存储']  多个属性条件组成的一个数组 [属性id:属性值:属性名字]




4. 封装api接口函数 ✔

第5天
1. 封装Vuex ✔

2. 在Search组件内部提交action发送异步请求 ✔

3. 显示品牌信息 ✔

4. 显示平台属性信息 ✔

5. 显示商品的信息 ✔

6. 参数的设置 ✔

7. 根据参数进行请求的相关操作  (query参数或者params参数) ✔
能够跳转到当前的Search界面的组件有两个:TypeNav组件和Header组件
TypeNav组件跳转到Search组件中传递了query参数---categoryName和category1Id||category2Id||category3Id
Header组件跳转到Search组件中传递了params参数---keyword
无论是哪个组件都可以传递参数数据:
 categoryName和(category1Id||category2Id||category3Id)
 keyword
 我如何获取这些参数数据,通过当前组件实例对象的路由信息对象获取
  this.$route 中获取query和params


  bug1:
  Header组件跳转到当前的Search路由可以正常发送请求,获取数据,但是,此时如果在Search界面点击分类信息跳转到Search界面,没有发送请求,同时,路由地址的参数发生了变化
  TypeNav组件跳转到当前的Search路由可以正常发送请求,获取数据,但是,此时如果在Search界面点击Header组件的搜索按钮跳转到Search界面,没有发送请求,同时,路由地址的参数发生变化

  Header组件跳转到Search组件,Search组件会重新的创建,但是在Search组件内在跳转到Search组件不会重新创建Search组件
  A组件跳转B组件,B组件会重新创建,B跳转到B,B组件不会重新创建
  解决:路由的参数发生变化,我就要重新的发送请求获取数据
  路由参数变化--->响应路由参数变化---->动态路由的匹配问题
  解决的思路:vue-router官方,左侧列表--->动态路由匹配---->响应路由参数的变化
  解决的方式:监视$route路由信息对象,跳转的时候重新的获取参数数据,重新更新参数数据,重新发送异步请求操作


  bug问题:
  先分类跳转,地址栏有参数,然后搜索关键字,地址栏原来的参数就丢了
  先搜索,后分类,搜索关键字没了,先分类后搜索,分类内容也没有

  解决问题:
  1.Typenav组件内部有跳转问题,从来考虑过,query传参的时候path的问题

  2.Header组件内部跳转页有问题

  如果已经选择了分类信息 进行搜索,获取产品信息数据了,再次操作(再次点击其他的分类信息数据进行搜索),原来的搜索中携带的一些参数数据应该被重置清理一下


8. TypeNav组件内部跳转的操作问题

9. Header组件内点击按钮的跳转操作问题

10. 按照条件搜素商品数据的问题及bug(删除条件的问题)

11. 解决bug的路上

12. 点击品牌,进行产品的搜索操作

trademark: "245:华为"


第6天

1.点击平台属性,获取进行产品信息的搜索操作及移除平台属性

2.综合及价格的排序操作

3.响应式数据的操作----通过品牌信息的筛选来实现---知识点---优化项目的操作

4.关于搜索数据的参数优化操作

5.分页组件的封装-----高级复用组件的抽取的思路及实现

面试题:你在开发项目的时候,有没有封装过高级的复用组件-----分页组件
1. 先用别人封装后的分页组件
2. 自己设计分页组件,并封装高级复用组件
  
设计通用组件的基本思路
  1) 基本界面的结构搭建和样式的布局

  2) 设计组件内部的状态数据
    currentPage:当前的页码----状态数据---经常发生变化
    点击某个分页的按钮,该数据就会发生变化

  3) 设计接收哪些动态的属性数据在组件中使用
    分页组件: 
      1 总的数据条数
      2 每页显示多少条数据
      3 当前的显示第几页的数据---默认第一页
      4 连续的页码数(一般连续的页码数是奇数,偶数不容易做)
    分页组件,外部在使用的时候,可能会出现一次需要传递多个参数数据,挺麻烦,所以,可以把这些接收的状态数据都扔进一个对象中,---配置对象,外部调用该组件直接传配置对象即可
      pageConfig:{
        total:0 , // 总的数据条数
        pageSize: 5, // 每页显示多少条数据
        pageNo:1 , // 默认显示第几页的数据---第一页
        showPages: 5 // 连续的页码数(一般连续页码是奇数)

      }


  4) 设计组件内部状态数据发生变化,是否需要通知父级组件,(可以使用Vue的自定义事件或者属性函数的方式来实现)
      首先保存当前的页码数
      其次,通知父级组件,页码数发生变化,请重新请求数据
      分发自定义事件的方式

  设计通用组件的基本思路:没有思路该怎么办--->直接在当前页面中写结构及样式,实现效果--->抽取结构及样式,及状态数据-->抽取组件


  需要计算连续显示的页码(连续的按钮里面的数字的开始和结束需要进行计算)
  连续页码是5      1,2,3,4,5   3,4,5,6,7   7,8,9,10,11

  1) 先计算总的页码数  =  向上取整(总的数据条数/每页数据的条数)
     总的页码数 = Math.ceil(13/5)    结果:3

  2) 计算连续页码的开始页码和结束页码
      当前页码,连续页码数,总的页码数
      开始页码和结束页码
      5 6 7 8 9
      5 6 7 

      连续页码 是 7 
      当前页码 是 12
          9 10  11 12  13  14  15 

      连续页码的 开始页码数 = 当前页码 - 向下取整(连续页码/2)
       开始页码 = 7 - 5/2  = 5
      连续页码的 结束页码数 = 当前页码 + 向下取整(连续页码/2)
       结束页码 = 7 + 5/2 = 9


       面试题:v-if指令和v-for指令是否可以一起使用



  当在Search组件内部调用分页组件Pagination组件的时候,点击不同的页码按钮,发送请求获取新的数据,没有问题
  但是,如果获取新的数据后,点击第二页, 然后选择品牌,此时出现bug,首先第二个按钮还是被选中的,发送的请求中参数中pageNo还是2,这是有问题的---bug
  解决bug:



  在详情页点击 添加购物车按钮,需要调用 添加购物车的api接口,同时需要跳转到 添加购物车成功  的界面
  此时出现bug
  1. 调用接口发送请求
  2. 跳转路由

  无论是添加成功还是 失败 都会跳转到 添加购物车成功 的界面
  bug :
  解决方案:
  1. callback 回调
       在提交action的时候,传入一个回调,回调内部传入 成功或者失败的信息数据,外部判断该信息是否存在则进行路由的跳转
       1)组件中:在dispatch的时候需要指定一个回调函数
       2)在异步的action中,在请求成功和失败的判断中,调用callback,传入errorMsg(可能有值也可能没有值)
       3) 在回调函数内部: 判断如果接收的errorMsg没有数据则添加成功,如果有数据证明是添加失败,那么就提示错误信息即可

  2. async + await  promise 的方式

      利用的是async 函数
      前提: async函数执行的返回值是个promise对象
      promise成功的value:函数体执行没有出错,那么return 的就是value(不能是失败的promise)
      promise失败的reason:函数体执行出错,抛出错误error/返回的是一个失败的promise
      组件内部:store.dispatch()返回值就是action函数的返回值

      1) 在组件中: 正常的提交action: this.$store.dispatch('addToCart', query)
      2) 在异步的action中: 在请求处理成功或者失败后,返回的相关的errorMsg(有可能有中或者有可能没有值)
      return result.code===200?'':(result.message||'添加失败')
      3) 组件中,通过await 来得到错误信息errorMsg,根据errorMsg来做对应的处理



      localStorage和sessionStorage的区别
      相同点:
        1)都需要浏览器进行存储数据
        2)语法相同
          setItem()/getItem()/removeItem()
        都可以人为的清空数据
      不同点:
        sessionStorage
          存在于浏览器的运行内存中---->浏览器关闭,数据被清除,浏览器重新打开,数据是读取不到的
          操作数据相对的快一些
        localStorage
          存在于浏览器管理的本地文件中---->浏览器关闭再打开,数据依然存在,还可以进行读取操作
          操作数据相对的慢一些


          接下来的操作:

          删除指定的购物车中的商品

          删除所有选中的购物车商品

          改变某个购物车中商品的选中状态

          改变购物车所有的商品的选中状态

          修改购物车中商品的数量









*/