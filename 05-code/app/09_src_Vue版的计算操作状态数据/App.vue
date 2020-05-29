<template>
  <div>
    <h2>点击次数:{{count}},奇数or偶数:{{evenOrOdd}}</h2>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="incrementOrOdd">incrementOrOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0
    }
  },
  computed: {
    evenOrOdd() {
      return this.count % 2 === 0 ? '偶数' : '奇数'
    }
  },
  methods: {
    // 加的操作
    increment() {
      this.count++
    },
    // 减的操作
    decrement() {
      this.count--
    },
    // 奇数加
    incrementOrOdd() {
      if (this.count % 2 !== 0) {
        this.count++
      }
    },
    // 异步加
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }
  }
}

// 修改状态数据---更新状态---操作状态数据--->管理状态数据
// 该组件的状态数据,还有可能会在其他组件中使用--->
</script>
<style scoped>
</style>
