<template>
  <div>
    <router-link to="/about">显示about</router-link>
    <router-link to="/home">显示home</router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style scoped>
</style>