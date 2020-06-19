/*
包含项目中n个组件可复用的js配置
*/

export const cpMixin = {
  methods: {
    pullMoney(money) {
      this.money -= money
    },
    gaveMoney(money) {
      // 孩子借钱给付钱
      this.money -= money
      // 找到父级组件
      this.$parent.money += money
    }
  }
}
