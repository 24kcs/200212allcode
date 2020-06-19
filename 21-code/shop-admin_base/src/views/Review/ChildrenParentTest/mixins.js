// /*
// 包含项目中n个组件可复用的js配置
// */
// 向外部暴露一个对象----多个组件中相同的结构的代码
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
