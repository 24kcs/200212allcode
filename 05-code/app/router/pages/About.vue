<template>
  <div>
    <h2>About</h2>
    <p>{{msg}}</p>
    <input type="text">
  </div>
</template>
<script>
  export default {
    // 声明接收标签属性
    props: ['msg']
  }
</script>
<style>
  
</style>
