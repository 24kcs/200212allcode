<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>---
        <button @click="pushHandle(m.id)">push查看</button>---
        <button @click="replaceHandle(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data() {
    return {
      // 自己定义一些数据,进行遍历即可
      messages: [] // 空数组
    }
  },
  // 页面加载后设置messages数组中有数据
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 2, title: 'message002' },
        { id: 3, title: 'message003' }
      ]
    }, 1000)
  },
  methods: {
    // 实现编程式路由跳转
    pushHandle(id){
      this.$router.push(`/home/message/detail/${id}`)
    },
    replaceHandle(id){
      this.$router.replace(`/home/message/detail/${id}`)
    }
  }
}
</script>
<style scoped>
</style>