<template>
 <a href="javascript:;" :title="title">
      <el-button v-bind="$attrs" v-on="$listeners">{{title}}</el-button>
    </a>
</template>

<script>
export default {
  name: 'LinkButton',
  props:['title']

 
}
</script>

<style lang="less" scoped>
</style>
