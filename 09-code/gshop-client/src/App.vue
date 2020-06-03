<template>
  <div>
    <Header />
    <!--路由视图,用来展示路由组件中的内容-->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'
// 引入接口函数文件api
import { reqBaseCategoryList } from './api'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    Footer
  },
  async mounted() {
    const result1 = await reqBaseCategoryList()
    console.log(result1)
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>