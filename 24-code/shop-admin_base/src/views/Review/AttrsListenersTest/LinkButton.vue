<template>
  <a href="javascript:;" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners">{{title}}</el-button>
  </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props:['title'],
  // mounted () {
  //   console.log(this.$attrs)
  // }
  // mounted () {
  //   console.log(this.$listeners)
  // }
}


// var obj={
//   name:'小明'
// }
// console.log(obj.name)
// console.log(obj['name'])

// <img v-bind:src="imageSrc">
// var key ='src'
// <button v-bind:['src']="value"></button>


// <!-- 绑定一个全是 attribute 的对象 -->
// data 对象中 有个someProp表达式   
// data(){
//   return {
//     someProp:'很好'
//   }
// }
// <img :a="" :b=""  :c=""  v-bind="{a:'a',b:'b'}"/>
// <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

// !-- 对象语法 (2.4.0+) -->
// buttton @click  @mounseenter @mouseout
// <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
</script>

<style lang="less" scoped>
</style>
