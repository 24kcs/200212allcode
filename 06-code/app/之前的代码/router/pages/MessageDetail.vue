<template>
  <ul>
    <!-- <li>ID: {{$route.params.id}}</li> -->
    <li>ID: {{id}}</li>
    <li>TITLE: {{detail.title}}</li>
    <li>CONTENT: {{detail.content}}</li>
  </ul>
</template>
<script>
  const allMessageDetails =  [
          {id: 1, title: 'message001', content: 'message content001'},
          {id: 3, title: 'message003',  content: 'message content003'},
          {id: 5, title: 'message005',  content: 'message content005'},
        ]
  export default {
    props: {
      id: String
    },

    data () {
      return {
        detail: {} // 当前需要显示的detail对象
      }
    },

    mounted () {
      console.log('MessageDetail mounted()')
      this.showDetail(this.$route)
    },

    watch: {
      $route (val) { // 路由信息发生了改变
        this.showDetail(val)
      },
      id (val) {
        console.log('id=', val)
      }
    },

    methods: {
      showDetail (route) {
        const id = route.params.id * 1
        // 查找对应的detail
        const detail = allMessageDetails.find(detail => detail.id===id)
        // 更新数据
        this.detail = detail
      }
    },
  }
</script>
<style>
  
</style>
