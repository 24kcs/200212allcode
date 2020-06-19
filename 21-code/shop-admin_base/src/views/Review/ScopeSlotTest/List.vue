<template>
  <ul>
    <!--颜色的显示操作由父级组件来完成-->
    <li v-for="(item,index) in todos" :key="item.id">
      <!--把数组中的每个数据传递给父级组件-->
      <slot :row="item" :index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props:{
    todos:Array
  }
}
</script>
