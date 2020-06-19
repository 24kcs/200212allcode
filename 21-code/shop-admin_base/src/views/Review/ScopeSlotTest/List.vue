<template>
<ul>
  <li v-for="(item,index) in todos" :key="item.id">
    <!--slot是占位,其次,把item和index传递给了父级组件-->
    <slot :row="item" :index="index"></slot>
  </li>
</ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    todos: Array
  }
}
</script>
