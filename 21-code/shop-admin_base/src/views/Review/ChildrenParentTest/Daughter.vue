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
