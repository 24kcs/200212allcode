<template>
  <div>
    <span>小明每次花100元</span>
    <!--子级组件内部点击按钮,修改父级组件中的数据-->
    <button @click="$emit('update:money',money-100)">花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Child',
  props:['money']
}
</script>
