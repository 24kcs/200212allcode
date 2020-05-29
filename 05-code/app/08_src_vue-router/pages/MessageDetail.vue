<template>
  <ul>
    <!-- <li>ID:{{$route.params.id}}</li> -->
      <li>ID:{{id}}</li>
    <li>TITLE:{{detail.title}}</li>
    <li>CONTENT:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  name: 'MessageDetail',
  props:['id'],
  data() {
    return {
      messageDetails: [
        { id: 1, title: 'message001', content: 'detail001' },
        { id: 2, title: 'message002', content: 'detail002' },
        { id: 3, title: 'message003', content: 'detail003' }
      ],
      detail: {} // 用来存储查找后的对象信息
    }
  },
  // 当前这个组件在页面中显示的时候,根据message这个组件路由链接点击的时候,传入进来的参数,在messageDetails数组中进行查找
  // 页面加载后的生命周期回调函数
  mounted() {
    // 路由跳转的时候传递过来的参数数据
    // console.log(this)
    // 通过$route路由信息对象中的params属性(对象)获取路由跳转的时候传递过来的参数数据
    // const id = this.$route.params.id * 1
    // this.detail = this.messageDetails.find(message => message.id === id)
    this.showDetail(this.$route)
  },
  // 监视
  watch: {
    $route(val) {
      // const id = this.$route.params.id * 1
      // this.detail = this.messageDetails.find(message => message.id === id)
      this.showDetail(val)
    }
  },
  methods: {
    // 封装成一个方法
    showDetail(route) {
      const id = route.params.id * 1
      this.detail = this.messageDetails.find(message => message.id === id)
    }
  }
}
</script>
<style scoped>
</style>