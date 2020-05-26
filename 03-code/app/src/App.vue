<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo" />
      <Footer :todos="todos" />
    </div>
  </div>
</template>
<script>
// 引入Header组件
import Header from './components/Header'
// 引入List组件
import List from './components/List'
// 引入Footer组件
import Footer from './components/Footer'
export default {
  name: 'App',
  data() {
    return {
      todos: [
        { id: 1, title: '华华', isCompleted: false },
        { id: 2, title: '强强', isCompleted: true },
        { id: 3, title: '超超', isCompleted: false }
      ]
    }
  },
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  methods: {
    // 向数组中添加数据的方法
    addTodo(todo){
      this.todos.unshift(todo)
    },
    // 删除数据的方法,传入对应的这个数据的索引
    deleteTodo(index){
      this.todos.splice(index,1)
    },
    // 切换选中效果的方法
    toggleTodo(todo){
      todo.isCompleted = !todo.isCompleted
    }
  }
}


/*
  组件和组件之间需要传递数据,进行使用,这种方式称为:组件之间通信
  组件之间通信的方式有哪些?Vue中的一个面试题
  App组件需要把todos数组数据传递给List组件,List是个子级组件
  父级组件---->子级组件传递数据

  组件之间通信:父子组件通信,兄弟组件之间通信

  组件之间通信的方式:
  1. props--->父子组件之间通信


*/
</script>
<style scoped>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
