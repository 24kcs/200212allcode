## Vue前台PC端电商项目技术难点重点总结





### 1.路由搭建

	#### 1)一级路由

```
首页路由组件搭建:
Home 首页中间主体组件
Search 搜索商品列表组件
Detail 商品详情组件
ShopCart 购物车组件
AddCartSuccess 添加购物车商品成功组件
Trade 订单组件
Pay 支付组件
PaySuccess 支付成功组件
Center 个人中心组件
Register 注册组件
Login 登录组件

```

​	

#### 2)二级路由

```
Center 个人中心一级路由组件
  MyOrder 我的订单二级路由组件
  GroupBuy 我的团购二级路由组件
  
```



#### 3)普通组件及全局公共组件

```
TypeNav 商品分类组件 全局公共组件     在components目录中
Header 首页头部组件 普通组件         在components目录中
Footer 首页底部组件  普通组件        在components目录中
Carousel 轮播图组件   全局公共组件   在components目录中
Pagination 分页组件   全局公共组件   在components目录中
```



#### 4)组件总结

```
一级路由组件 一共11个
二级路由组件 一共2个
普通组件    一共2个
全局公共组件 一共3个
```





### 2.组件功能

```
1. 项目打开,默认显示首页内容,此时使用的是Header和Home和Footer 三个组件
2. Header组件和Footer组件在大多数界面都会正常的显示
3. Home组件是首页主体部分,内部拆分了7个组件
   1) TypeNav 全部商品分类组件(该组件是全局公共组件,在components目录中定义)需要在Home组件内部引入
   2) ListContainer Home内部的一个显示轮播图及右侧信息的组件
   3) TodayRecommend Home内部的一个显示今日推荐内容的组件
   4) Rank Home内部的一个显示商品排行的组件
   5) List Home内部的一个显示猜你喜欢的组件
   6) Floor Home内部的一个显示楼层的组件
   7) Brand Home内部的一个显示商标的组件
   
 4.Login路由组件---用来实现登录界面功能的组件
 5.Register路由组件---用来实现注册用户的组件
 6.Search路由组件----用来显示商品信息列表的组件
 7.Detail路由组件----用来点击Search组件内部商品跳转的时候显示当前商品的详情页组件
 8.AddCartSuccess路由组件---用来点击Detail商品详情组件加入购物车的时候跳转的时候显示添加购物车成功的组件
 9.ShopCart路由组件---用来显示购物车中商品列表的组件
 10.Trade路由组件---用来ShopCart购物车组件提交订单跳转的时候显示的订单组件
 11.Pay路由组件---用来进行支付的组件
 12.PaySuccess组件---用来显示支付成功的组件
 13.Center组件----用来显示个人中心的组件(MyOrder和GroupBuy)
```





### 3.功能流程





### 4.难点总结







### 5.重点总结





### 6.项目面试题总结





