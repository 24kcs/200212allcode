<template>
  <div class="todo-footer">
    <slot name="left"/>
    <slot name="center"/>
    <slot name="right"/>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  // props: {
  //   todos: Array,
  //   checkAllTodo: Function
  // },
  // computed: {
  //   count() {
  //     // 计数---累加
  //     return this.todos.reduce(
  //       (pre, item) => pre + (item.isCompleted ? 1 : 0),
  //       0
  //     )
  //   },
  //   // 计算属性---全选或者全不选的操作
  //   checkAll: {
  //     get() {
  //       return this.count === this.todos.length && this.count > 0
  //     },
  //     set(val) {
  //       this.checkAllTodo(val)
  //     }
  //   }
  // }
}
</script>
<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
