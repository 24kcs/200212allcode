<template>
  <div>
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="gaveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import {cpMixin} from './mixins' 
export default {
  name: 'Daughter',
  mixins:[cpMixin],
  data() {
    return {
      money: 20000
    }
  },
  methods: {
    
    // pullMoney(money) {
    //   this.money -= money
    // },
    //  gaveMoney(money){
    //   this.money-=money
    //   // $parement----父级组件----下面的操作最好是父子组件通过一个方式来进行通信(比如:函数)
    //   this.$parent.money+=money
    // }
  }
}
</script>
