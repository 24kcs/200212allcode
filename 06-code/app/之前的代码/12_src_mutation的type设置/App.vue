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
// 引入Vuex的辅助函数
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// 引入mutation的type
import { INCREMENT, DECREMENT } from './vuex/mutation-type'
export default {
  name: 'App',
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // computed: {
  //   evenOrOdd() {
  //     return this.count % 2 === 0 ? '偶数' : '奇数'
  //   }
  // },
  computed: {
    // count() {
    //   return this.$store.state.count
    // },
    // evenOrOdd() {
    //   return this.$store.getters.evenOrOdd
    // }
    // count:function(){return this.$store.state.count}
    // 拆包的写法
    ...mapState(['count']),
    ...mapGetters(['evenOrOdd'])
  },
  methods: {
    // 加的操作
    // increment() {
    //   this.$store.commit('INCREMENT')
    //   // this.$store.dispatch('increment')
    // },
    // // 减的操作
    // decrement() {
    //   this.$store.commit('DECREMENT')
    //   // this.$store.dispatch('decrement')
    // },
    ...mapMutations({ increment: INCREMENT, decrement: DECREMENT }),
    ...mapActions(['incrementOrOdd', 'incrementAsync'])
    // 奇数加
    // incrementOrOdd() {
    //   this.$store.dispatch('incrementOrOdd')
    // },
    // // 异步加
    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // }
  }
}

// 修改状态数据---更新状态---操作状态数据--->管理状态数据
// 该组件的状态数据,还有可能会在其他组件中使用--->

// 拆包
var arr1 = [1, 2, 3, 4, 5]
var arr2 = [...arr1]
console.log(arr2)
// 打包
function f1(...args) {
  console.log(args)
}
f1(10, 20, 30)
</script>
<style scoped>
</style>
