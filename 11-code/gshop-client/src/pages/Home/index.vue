<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>
<script>
// 引入ListContainer 列表 组件
import ListContainer from './ListContainer'
// 引入TodayRecommend 今日推荐 组件
import TodayRecommend from './TodayRecommend'
// 引入 Rank 商品排行 组件
import Rank from './Rank'
// 引入 Like 猜你喜欢 组件
import Like from './Like'
// 引入Floor 楼层 组件
import Floor from './Floor'
// 引入 Brand 商标 组件
import Brand from './Brand'
// 引入接口
import {reqBanners,reqFloors} from '../../api'
export default {
  name: 'Home',
  // 注册组件
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  // 页面加载的生命周期回调函数
   mounted () {
    //console.log('home')
    // 调用接口进行测试
    // const result1 = await reqBanners()
    // const result2 = await reqFloors()
    // console.log(result1)
    // console.log(result2)
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>