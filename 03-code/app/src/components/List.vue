<template>
  <ul class="todo-main">
    <Item v-for="(todo,index) in todos" :key="todo.id" :todo="todo" :index="index" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
  </ul>
</template>
<script>
// 引入Item组件
import Item from './Item'
export default {
  name: 'List',
  // 接收父级组件传递过来的数据,通过this可以直接访问todos数据
  props: ['todos','deleteTodo','toggleTodo'],
  components: {
    Item
  }
}
</script>
<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
