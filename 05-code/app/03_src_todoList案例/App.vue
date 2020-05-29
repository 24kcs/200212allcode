<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--@就是绑定事件,后面addTodo就是对应的回调函数-->
      <!-- <Header @addTodo1="addTodo2" addTodo1是自定义事件,addTodo2就是回调函数 /> -->
      <Header @addTodo="addTodo" />
      <List :todos="todos" />
      <!-- <Footer :todos="todos" :checkAllTodo="checkAllTodo" /> -->
      <Footer :todos="todos" :checkAllTodo="checkAllTodo">
        <!-- <p slot="left">哈哈,我又变帅了</p> -->
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
import Vue from 'vue'
export default {
  name: 'App',
  data() {
    return {
      // todos: [
      //   { id: 1, title: '华华', isCompleted: false },
      //   { id: 2, title: '强强', isCompleted: true },
      //   { id: 3, title: '超超', isCompleted: false }
      // ]
      // todos:JSON.parse(localStorage.getItem('todos_key')||'[]')
      todos: storage.get()
    }
  },
  // 页面加载完毕了
  mounted() {
    // App组件的实例对象继承自Vue的实例对象
    // console.log(this)
    // console.log(this.__proto__===VueComponent.prototype)
    // console.log(VueComponent.__proto__===Vue.prototype)
    // console.log(this.__proto__.__proto__ === Vue.prototype)
    // 总结this指向的是Vue的实例对象---间接继承Vue的实例对象
    // 任意的组件都可以直接访问Vue的原型上的属性或者方法
    // this.$sayHi()
    // 订阅消息---删除
    this.token = PubSub.subscribe('deleteTodo', (msg, index) => {
      console.log(msg)
      // msg---消息的名字
      // data----该消息发布的时候传入的参数
      // 删除某个数据
      this.deleteTodo(index)
    })
    // 通过事件总线的方式,绑定事件
    this.$bus.$on('toggleTodo', todo => {
      this.toggleTodo(todo)
    })
  },
  // 当前组件销毁之前先取消消息订阅----干掉了PubSub对象
  beforeDestroy() {
    // 取消消息订阅
    PubSub.unsubscribe(this.token)
    // 解绑事件
    // this.$bus.$off('toggleTodo')
    this.$bus.$off() // 干掉所有绑定的事件
  },
  // 注册组件
  components: {
    Header,
    List,
    Footer
  },
  methods: {
    // 向数组中添加数据的方法
    addTodo(todo) {
      this.todos.unshift(todo)
    },
    // 删除数据的方法,传入对应的这个数据的索引
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },
    // 切换选中效果的方法
    toggleTodo(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    // 全选或者全不选的操作行为---方法
    checkAllTodo(isChecked) {
      this.todos.forEach(item => {
        item.isCompleted = isChecked
      })
    }
  },
  // 监视---侦听
  watch: {
    todos: {
      // 深度监视---监视的这个数据的里面还有其他的数据(嵌套层次比较深,最里面的数据变化了,我都可以知道)
      deep: true,
      // 这里写要做的事情
      // handler:function (val){
      //   // 缓存数据
      //   // localStorage.setItem('todos_key',JSON.stringify(val))
      //   storage.set(val)
      // }
      handler: storage.set
    }
  },
   computed: {
    count() {
      // 计数---累加
      return this.todos.reduce(
        (pre, item) => pre + (item.isCompleted ? 1 : 0),
        0
      )
    },
    // 计算属性---全选或者全不选的操作
    checkAll: {
      get() {
        return this.count === this.todos.length && this.count > 0
      },
      set(val) {
        this.checkAllTodo(val)
      }
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
