<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
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
// 引入PubSub
import PubSub from 'pubsub-js'
export default {
  name: 'Item',
  props: {
    // 接收父级组件传递过来的数据,同时设置todo的这个数据,一定是Object类型---对象
    todo: Object,
    index: Number
  },
  data() {
    return {
      fontColor: 'black', // 默认文字的颜色
      bgColor: 'white', // 默认背景颜色
      isShow: false // 默认不显示
    }
  },
  methods: {
    // 鼠标进入和离开事件的回调函数
    mouseHandler(flag) {
      if (flag) {
        // 鼠标进入事件
        this.fontColor = 'green'
        this.bgColor = 'pink'
        this.isShow = true
      } else {
        // 鼠标离开事件
        this.fontColor = 'black'
        this.bgColor = 'white'
        this.isShow = false
      }
    },
    // 点击按钮删除对应的数据
    del() {
      // 友好的提示信息
      if (confirm('您确定要删除这个信息吗')) {
        // 要删除数据
        // this.deleteTodo(this.index)
        // 发布删除的消息
        PubSub.publish('deleteTodo', this.index)
      }
    }
  },
  // 计算属性
  computed: {
    isChecked: {
      get() {
        return this.todo.isCompleted
      },
      set() {
        // 此时就是要设置todo对象中的isCompleted属性值
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
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
