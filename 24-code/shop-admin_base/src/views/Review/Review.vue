<template>
  <div style="padding: 10px">
    <h2>组件间通信高级(**非常重要, 面试必备**)</h2>
    <router-link to="/review/event">event深入</router-link>&nbsp;&nbsp;
    <router-link to="/review/model">v-model深入</router-link>&nbsp;&nbsp;
    <router-link to="/review/sync">属性修饰符sync</router-link>&nbsp;&nbsp;
    <router-link to="/review/attrs-listeners">$attrs与$listeners</router-link>&nbsp;&nbsp;
    <router-link to="/review/children-parent">$children与$parent</router-link>&nbsp;&nbsp;
    <router-link to="/review/scope-slot">作用域插槽scope-slot</router-link>&nbsp;&nbsp;
    <hr>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped>
  .router-link-active {
    color: red;
  }
</style>