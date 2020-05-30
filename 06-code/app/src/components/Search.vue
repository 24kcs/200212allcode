<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName" />
      <button @click="searchHandle">Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      searchName: '' // 存储用户在文本框中输入的数据内容
    }
  },
  methods: {
    searchHandle() {
      // 获取文本框的数据
      const txt = this.searchName.trim()
      if (txt) {
        // 提交action
        this.$store.dispatch('search',txt)
        // 清空文本框
        this.searchName = ''
      }
    }
  }
}
</script>
<style scoped>
</style>