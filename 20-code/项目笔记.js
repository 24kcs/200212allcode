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