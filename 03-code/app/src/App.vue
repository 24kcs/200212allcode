<template>
  <div>
    <Header/>
    <List/>
    <Footer/>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入List组件
import List from './components/List'
// 引入Footer组件
import Footer from './components/Footer'
export default {
  name: 'App',
  // 注册组件
  components: {
    Header,
    List,
    Footer
  }
}
</script>
<style scoped>
</style>
