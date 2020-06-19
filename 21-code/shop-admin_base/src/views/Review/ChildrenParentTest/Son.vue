<template>
  <div>
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="gaveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import {cpMixin} from './mixins'
export default {
  name: 'Son',
  mixins:[cpMixin],
  data() {
    return {
      money: 30000
    }
  },
  // methods: {
  //   pullMoney(money) {
  //     this.money -= money
  //   },
  //   gaveMoney(money) {
  //     this.money -= money
  //     this.$parent.money += money
  //   }
  // }
}
</script>
