/**
 * 面试题:说说你对象数据劫持及数据绑定的理解
 * Vue中的数据劫持observer(dep对象)和数据绑定watcher对象
 * 数据劫持:无非就是在创建Vue的实例时候,把vm.data中所有的属性一个一个添加observer的data对象上,同时产生对应个数的dep对象
 * 数据绑定:模版解析的时候,获取表达式的值的时候,开始创建watcher对象,并建立dep对象和watcher对象的关系,在内存的文档碎片对象中,进行表达式的值的解析,最终把data对象中的属性和html模版中的表达式联系起来
 *  在实例化Vue的时候,先实现数据代理操作,然后在模版解析之前,实现数据劫持,此时调用的是observe()方法,并传入data对象和vm对象,内部会先判断data数据是不是一个对象,如果是一个对象则开始创建劫持实例对象,在创建劫持对象的时候,通过遍历vm对象中data对象内部所有的属性的时候,开始创建dep对象(data中有一个属性就会创建一个dep对象,多少个属性就会创建多少个dep对象),然后通过Object.defineProperty()方法,把vm.data对象中所有的属性一个一个的添加到劫持对象的data对象中,此时实现了数据劫持操作.
    数据劫持操作后,开始模版解析,模版解析的过程中,先创建文档碎片对象,并在内部把html容器中所有的节点全部的扔进文档碎片对象中,开始进行遍历操作,无论当前的节点是标签还是文本,只要是用到了表达式,最终都会直接或者间接的调用内部的bind方法,在bind方法的内部会开始创建watcher对象(html模版中有一个表达式就创建一个watcher对象,多少个表达式就创建多少个watcher对象),然后在实例化watcher对象的内部,需要获取表达式的值,在获取表达式的值的时候,会自动的进入MVVM内部的Object.dineProperty方法的get方法内部,就会自动的介入Observer中的Object.dineProperty方法的get方法内部,内部开始判断是否存在watcher对象,如果存在则调用dep对象的相关方法并传入dep对象本身,内部实际上是调用的watcher对象的addDep方法,内部是把watcher对象添加到dep对象的subs数组中,dep的id及dep对象以键值对的方式存储到watcher对象的depIds对象中,此时dep对象和watcher对象关系建立完毕,关系一旦建立后则回到compile中,文档碎片对象内部的解析操作完成,添加到html容器中,页面开始正常的显示
    dep对象和watcher对象建立关系后,关系有如下几种:
    一对一的关系:一个dep对应一个watcher:data中定义了一个属性,html模版中用了一个表达式
    一对多的关系:一个dep对应多个watcher:data中定义了一个属性,html模版中用了多个表达式
    多对一的关系:多个dep对应一个watcher:data中定义了多个属性,html模版中用了一个表达式
    多对多的关系:多个dep对应多个watcher:data中定义了多个属性,html模版中用了多个表达式
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

 /**
  * 
  *  stylus的使用:
  * 1. 全局安装stylus
  * npm install -g stylus
  * 
  * 如果在静态页面中使用stylus,的方式(vscode开发软件中)
  * index.styl 和css目录是同级别关系
  *  stylus -w index.styl -o css目录
  * css 目录中有index.styl 文件
  * stylus -w index.styl css目录的绝对路径
  * 打开终端肯定是在index.styl的父级目录中打开
  * 
  * 
  * 
  * 
  * 
  * 
  *  如果电脑中已经安装了脚手架2,那么现在要安装脚手架3
  * Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要* 先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。
  * 安装脚手架3命令
  * npm install -g @vue/cli
  * 
  * 
  * 脚手架2的下载命令
  * npm install -g vue-cli
  * 脚手架3的下载命令
  * npm install -g @vue/cli
  * 注意:如果已经装了脚手架2
  * npm uninstall vue-cli -g 干掉----先干掉脚手架2,然后再安装脚手架3
  * 
  * 通过脚手架2下载模版的命令
  * vue init webpack app-client2
  * 通过脚手架3下载模版的命令
  * vue create app-client3
  * 
  * 注意: 我干掉了脚手架2,也安装了脚手架3,但是我就想通过脚手架2的命令下载模版!
  * 你可以全局安装一个桥接工具
  * npm install -g @vue/cli-init 此时就可以在电脑中又用脚手架2的命令下载模又可以用脚手架3的命令下载模版
  * 
  * 脚手架3启动项目的命令: npm run serve
  * 
  * 脚手架2运行项目命令:
  * npm run dev 或者 npm start
  * 打包  npm run build 
  * 运行打包 serve dist
  * 脚手架3运行项目命令；
  * npm run serve
  * 打包 npm run build 
  * 运行打包 serve dist
  * 
  * 脚手架3 中运行命令后 自动打开浏览器
  * package.json文件中设置
  *  "serve": "vue-cli-service serve --open"
  * 
  * 将来做项目的时候,脚手架 运行项目的命令不一定就是npm run dev 或者 npm start 或者 npm run serve
  * 具体是什么?看package.json文件的代码
  * 
  * 
  * 脚手架2中浏览器自动打开的设置 config目录中的index.js文件中  第18行代码 设置为true
  * 脚手架3中浏览器自动打开的设置 package.json 中  第六行代码 设置 --open
  * 
  * 脚手架2和脚手架3的目录的区别
  * public公共资源及index.html目录(脚手架3)，static目录中公共资源(脚手架2)
  * src目录中的main.js文件代码不一样
  * 脚手架2和脚手架3中的eslint检查设置也不一样
  * 脚手架3中package.json文件中第35行: "rules": {} 可以设置eslint语法检查关闭
  * 脚手架3中的vue.config.js文件中也可以设置eslint语法检查关闭(现在没有vue.config.js文件---自己手动创建)
  * 
  * 
  * 
  * 
  * 
  * 
  */


  /**
   * 
   * 1. 路由传参的问题
   * 2. 设置案例的效果的时候使用的是stylus 的方式进行样式操作
   * 如果在脚手架对应的项目使用stylus进行样式操作,首先需要安装插件 npm install stylus stylus-loader 
   * 此时在组件内部书写stylus 不需要手动编译,直接是写stylus代码，自动的编译成css项目可以直接使用
   * 
   * 
   * 
   * 
   * 
   * 路由组件传参:
   * 1. params方式:
   *  首先要在路由注册的时候,进行占位操作(:名字),同时通过组件对象调用$route来获取参数数据,params方式传参和组件的关系是很密切的(需要组件对象调用$route这个信息对象来获取相关的参数数据)-----和当前的组件对象耦合性比较高
   * 2. query方式:
   *   在注册路由的时候,不需要占位,只写地址,需要通过组件对象调用$route对象来获取参数数据,query方式传参和组件的关系依然是很密切的(需要组件对象调用$route这个信息对象来获取相关的参数数据)-----和当前的组件对象耦合性比较高
   * 3. meta 方式 :该对象是vue提供的,可以供我们自己向内部传递数据,进行传参操作
   *  在注册路由的时候添加一个meta对象(自带的meta对象,需要自己手动的进行书写),路由链接中不需要写任何内容,获取路由的参数需要$route对象来进行获取,和组件的关系依然很密切-----和当前的组件对象耦合性比较高
   * 我希望我路由组件在传递参数的时候和当前的组件的耦合性不那么高-----解耦,推荐使用props的方式
   * 4. props 
   *  布尔的方式:
   *     需要先在注册路由的时候设置props:true, 可以把params参数放在props对象中,直接进行获取参数数据,和$route进行解耦
   *  对象的方式:
   *     需要现在注册路由的时候设置props:{} 可以把参数数据直接放在props对象中,直接进行获取参数数据,和$route进行解耦
   *  回调函数的方式:
   *  在注册路由的时候把参数放在props的函数中,组件内部荣国props接收后可以直接使用,和$route进行解耦
   * 
   * 
   * 
   */