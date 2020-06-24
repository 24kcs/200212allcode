<template>
  <div>
    小明的爸爸现在有 {{ total }} 元
    <h2>不使用sync修改符</h2>
    <!--
      子级组件更新父级组件中的某个数据,书写方式  :money="表达式" @update:money="total=$event"
    -->
    <!-- <Child :money="total" @update="total=$event" /> -->
     <Child :money="total" @update:money="total=$event" />
    <h2>使用sync修改符</h2>
    <Child :money.sync="total" />
    <h2>使用v-model指令</h2>
    <Child2 v-model="total" />
   
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
  data() {
    return {
      total: 1000
    }
  },
  components: {
    Child,
    Child2
  }
}
</script>
