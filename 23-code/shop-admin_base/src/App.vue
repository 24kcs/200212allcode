<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // async mounted() {
  //   // 测试接口---已经成功了
  //   // const result = await this.$API.trademark.getTrademarkList(1, 5)
  //   // console.log(result)
  //   // console.log(this.$API)

  //   const result1 = await this.$API.spu.getSpuList(1, 5, 61)
  //   const result2 = await this.$API.sku.getSkuList(1, 5)

  //   console.log(result1)
  //   console.log(result2)
  // }
}
</script>
