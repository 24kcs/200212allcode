<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1">找儿子小明借100元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney2">找女儿小红借200元钱</button>
    <br />
    <hr />
    <button @click="borrowMoney3">找所有孩子借500元钱</button>
    <br />
    <hr />
    <Son ref="son" />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data() {
    return {
      money: 1000
    }
  },
  components: {
    Son,
    Daughter
  },
  methods: {
    // 向儿子借钱
    borrowMoney1() {
      // 父级组件直接操作子级组件中的数据----不推荐
      // this.$refs.son.money -= 100
      // 操作数据的组件是子级组件本身
      this.$refs.son.pullMoney(100)
      this.money += 100
    },
    borrowMoney2() {
      this.$refs.dau.pullMoney(200)
      this.money += 200
    },
    // 向所有的孩子借钱
    borrowMoney3() {
      // 如果有多个子级组件
      // this.$refs.son.pullMoney(500)
      // this.$refs.dau.pullMoney(500)
      // 获取的是所有的子级组件
      this.$children.forEach(child=>{
        child.pullMoney(500)
        this.money+=1000
      })
     
    }
  }
}
</script>

<style>
</style>
