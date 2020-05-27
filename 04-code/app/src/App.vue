<template>
  <div>
    <!-- <mt-button type="default" size="small">default</mt-button>
    <mt-button type="primary">primary</mt-button> -->
    <mt-button type="danger" style="width:100%" @click="showMsg">danger</mt-button>
  </div>
</template>
<script>
export default {
  methods: {
    showMsg(){
      console.log('哈哈,我又变帅了')
    }
  }
}
</script>
<style scoped>
</style>
