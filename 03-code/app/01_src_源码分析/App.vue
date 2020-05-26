<!--模版标签,是不会在页面中产生这个标签,里面放html的-->
<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <!--使用HelloWorld组件,如果这个组件中要嵌入一些其他的标签或者内容那就写成对的,否则可以简写,组件的名字是大写的,使用的时候可以小写,但是如果组件名字是多个单词,使用的时候,都是小写的,并且中间用-隔开,但是,一般我们就直接大写使用就可以了,因为有可能你的组件的名字和html标签的名字重复了,容易出现各种问题,推荐:使用大写方式,组件怎么用,组件可以当成标签使用就行了-->
    <HelloWorld></HelloWorld>
    <hello-world />
  </div>
</template>
<!--放的是js代码-->
<script>
// 引入HelloWorld组件, .vue后缀可以不写(简化的写法)
import HelloWorld from './components/HelloWorld'

export default {
  // 设置当前组件的名字
  name: 'App',
  // 注册组件
  components: {
    HelloWorld
  },
  // 最开始在html中创建Vue的实例的时候,由于就是一个html文件,里面也没有组件的使用,所以,data是一个对象
  // 但是,到了脚手架中,每个组件都是一个对象,每个组件都是Vue的实例对象的子对象,每个组件中都有一些数据要进行操作或者使用,所以,每个组件中的data不是一个对象,而是一个函数,又因为组件可以多次的复用,每次复用产生的组件对象中的data数据都应该是独立存在的,不能被共享的,所以,data是一个函数,而不是一个对象(暂且理解不了没关系)
  data() {
    return {}
  }
}
</script>
<!--放的是css代码-->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
