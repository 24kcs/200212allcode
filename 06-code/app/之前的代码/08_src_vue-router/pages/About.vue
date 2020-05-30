<template>
  <div>
    <h2>About</h2>
    <input type="text" v-model="xy">
  </div>
</template>
<script>
export default {
  name: 'About',
  props:['xy'],
  beforeDestroy () {
    console.log('我挂了')
  }
}
</script>
<style scoped>
</style>