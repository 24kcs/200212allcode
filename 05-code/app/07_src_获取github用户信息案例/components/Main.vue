<template>
  <h2 v-if="firstView">请输入搜索内容...</h2>
  <h2 v-else-if="loading">正在发送请求中...</h2>
  <h2 v-else-if="errorMsg">错误信息为:</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user,index) in users" :key="index">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      firstView: true, // 默认显示第一个提示信息
      loading: false, // 默认第二个提示信息不显示
      errorMsg: false, // 默认第三个提示错误信息不显示
      users: [] // 存储获取到的用户信息的
    }
  },
  // 界面加载之后的生命周期回调
  mounted() {
    // 通过事件总线绑定事件,发送异步请求,获取数据,展示信息
    this.$bus.$on('search', async searchName => {
      // 接口地址
      const url = `https://api.github.com/search/users`
      // 第一次修改状态数据
      this.firstView = false
      this.loading = true
      try {
        // 发送异步请求
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })

        // 获取响应回来的数据,并解构出想要的三个属性(每个对象中的三个属性)
        const users = response.data.items.map(user => ({
          login: user.login,
          html_url: user.html_url,
          avatar_url: user.avatar_url
        }))
        // console.log(users)
        // 第二次修改状态数据
        this.loading = false
        this.users = users
        // console.log(this.users)
      } catch (error) {
        // 第三次修改状态数据
        this.loading = false
        this.errorMsg = error
      }
    })
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>