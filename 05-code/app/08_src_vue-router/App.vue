<template>
  <div>
    <!-- <router-link to="/about">显示about</router-link>
    <router-link to="/home">显示home</router-link>
    <hr>
    <router-view></router-view>-->
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Router Basic - 01</h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- <a href="/about" class="list-group-item router-link-exact-active router-link-active">About</a>
          <a href="/home" class="list-group-item">Home</a>-->

          <router-link to="/about" class="list-group-item">About</router-link>
          <router-link to="/home" class="list-group-item">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
           <keep-alive>
              <router-view xy="啊,真香"></router-view>
           </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style scoped>
</style>