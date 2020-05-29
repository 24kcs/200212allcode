<template>
  <!--只能有一对根标签-->
  <div>
    App组件
    <Hello />
  </div>
</template>
<script>
// 引入Hello组件
import Hello from './components/Hello'
// 向外暴露这个组件对象,组件也是对象
export default {
  // 当前组件的名字
  name: 'App',
  // 注册组件
  components: {
    Hello
  }
}
</script>
<style scoped>
div {
  background-color: green;
}
</style>
