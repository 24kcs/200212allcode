<template>
  <h2 v-if="!repUrl">正在加载中...</h2>
  <h2 v-else>
    Most Star is
    <a :href="repUrl">{{repName}}</a>
  </h2>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  // 需求:当页面加载后,发送异步请求,获取github中Vue的链接及名字信息
  name: 'App',
  data() {
    return {
      repUrl: '', // 发送异步请求后,获取的链接地址信息
      repName: '' // 发送异步请求后,获取的链接信息的名字
    }
  },
  // 页面加载完毕后才发送异步请求
  async mounted() {
    // 地址,发送请求,获取响应回来的数据
    // Vue中如何发送异步请求: vue-resource插件或者axios插件
    // console.log(this)
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`

    // axios
    // .get(url)
    // .then(response=>{
    //   // 获取响应数据中的第一个数据
    //   const result = response.data.items[0]
    //   // 更新data对象中的状态数据
    //   this.repUrl = result.html_url
    //   this.repName = result.name
    // })
    // .catch(error=>{
    //   console.log(error)
    // })

    const promise = await axios.get(url)
    console.log(promise)
    const result = promise.data.items[0]
    this.repUrl = result.html_url
    this.repName = result.name
  }
}
</script>
<style scoped>
</style>