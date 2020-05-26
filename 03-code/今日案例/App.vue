<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <!-- <Footer :todos="todos" :checkAllTodo="checkAllTodo" /> -->
      <Footer :todos="todos" :checkAllTodo="checkAllTodo">
        <label slot="left">
          <input type="checkbox" v-model="checkAll" />
        </label>
        <span slot="center">
          <span>已完成{{count}}</span>
          / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" slot="right">清除已完成任务</button>
      </Footer>
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
// 引入storage
import storage from './utils/storage.js'
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'App',
  components: {
    Header,
    List,
    Footer
  },
  computed: {
    count() {
      return this.todos.reduce(
        (pre, item) => pre + (item.isCompleted ? 1 : 0),
        0
      )
    },
    checkAll: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTodo(val)
      }
    }
  },
  mounted() {
    this.token = PubSub.subscribe('deleteTodo', (msg, data) => {
      this.deleteTodo(data)
    })
    this.$bus.$on('toggleTodo', todo => {
      this.toggleTodo(todo)
    })
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.token)
    this.$bus.$off()
  },
  data() {
    return {
      // todos: [
      //   { id: 1, title: '华华', isCompleted: false },
      //   { id: 2, title: '强强', isCompleted: true },
      //   { id: 3, title: '超超', isCompleted: false }
      // ]
      // todos: JSON.parse(localStorage.getItem('todos_key') || '[]')
      todos: storage.getStorage()
    }
  },
  methods: {
    // 自定义事件的回调函数
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换操作
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 全选
    checkAllTodo(isChecked) {
      this.todos.forEach(item => {
        item.isCompleted = isChecked
      })
    }
  },
  watch: {
    todos: {
      deep: true,
      // handler: function(val) {
      //   localStorage.setItem('todos_key', JSON.stringify(this.todos))
      // }
      handler: storage.setStorage
    }
  }
}
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
