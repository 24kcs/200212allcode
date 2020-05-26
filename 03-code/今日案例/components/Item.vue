<template>
  <li
    @mouseenter="mouseHandle(true)"
    @mouseleave="mouseHandle(false)"
    :style="{color:fontColor,backgroundColor:bgColor}"
  >
    <label>
      <input type="checkbox" v-model="isChecked" />
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>
<script>
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  props: {
    todo: Object,
    deleteTodo: Function,
    index: Number
  },
  data() {
    return {
      fontColor: 'black',
      bgColor: 'white',
      isShow: false
    }
  },
  methods: {
    mouseHandle(flag) {
      // 鼠标进入
      if (flag) {
        this.fontColor = 'pink'
        this.bgColor = 'green'
        this.isShow = true
      } else {
        // 鼠标离开
        this.fontColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 删除
    del() {
      if (confirm('确定要删除吗')) {
        PubSub.publish('deleteTodo', this.index)
        // this.deleteTodo(this.index)
      }
    }
  },
  computed: {
    isChecked: {
      get() {
        return this.todo.isCompleted
      },
      set() {
        // this.toggleTodo(this.todo)
        this.$bus.$emit('toggleTodo', this.todo)
      }
    }
  }
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
