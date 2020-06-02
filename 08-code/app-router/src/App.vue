<template>
  <div>
    <div class="navContainer">
      <div class="nav">
        <router-link to="/home">Home</router-link>
      </div>
      <div class="nav">
         <!-- <router-link to="/about">About</router-link> -->


         <!--params参数方式演示-->
         <!-- <router-link to="/about/123">About</router-link> -->


         <!--query参数方式演示-->
          <!-- <router-link to="/about?age=100">About</router-link> -->


          <!--meta参数方式样式-->
          <!-- <router-link to="/about">About</router-link> -->

          <!--props传参方式1:布尔模式-->
           <!-- <router-link to="/about/98362">About</router-link> -->

          <!--props传参方式2:对象模式-->
            <!-- <router-link to="/about">About</router-link> -->


            <!--props传参方式3:函数模式-->
             <router-link to="/about">About</router-link>
      </div>
    </div>
    <!--路由视图-->
    <router-view></router-view>
    <!-- <p>params传参:{{$route.params.id}}</p>
    <p>query传参:{{$route.query.age}}</p>
    <p>meta传参:{{$route.meta.isShow}}</p> -->
  </div>
</template>
<script>
export default {
  name:'App'
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.navContainer
  display flex
  top 0
  width 100%
  background-color #fff
  .nav
    width 50%
    height 80px
    line-height 80px
    text-align center
    border-bottom 2px solid red
    box-sizing border-box
</style>