<template>
  <div>
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
// 引入混合(混入)
import {cpMixin} from './mixins' 
export default {
  name: 'Son',
  mixins:[cpMixin],

  data() {
    return {
      money: 30000
    }
  },
  methods: {
    // pullMoney(money){
    //   this.money -= money
    // },
    // gaveMoney(money){
    //   this.money-=money
    //   // $parement----父级组件----下面的操作最好是父子组件通过一个方式来进行通信(比如:函数)
    //   this.$parent.money+=money
    // }
  }
 
}
</script>
