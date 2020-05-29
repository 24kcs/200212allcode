<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.13="add" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      title: '' // 用来存储文本框中输入的数据
    }
  },
  // mounted () {
  //   console.log('==========')
  //   this.$sayHi()
  // },
  // 接收父级组件传递过来的数据
  // props: {
  //   addTodo: {
  //     type: Function, // 当前的这个数据的类型
  //     required: true // 必须的
  //   }
  // },
  methods: {
    // 回车实现添加数据的方法
    add() {
      // 获取文本框的输入数据,并去掉空格
      const title = this.title.trim()
      // 判断是否有数据
      if (title) {
        const todo = {
          id: Date.now(),
          title,
          isCompleted: false
        }
        // 此时调用父级组件传递过来的方法
        // this.addTodo(todo)
        // 此时当前的这个组件对象内部就有了addTodo的自定义事件,需要手动分发事件
        // 分发自定义事件
        // 参数1:自定义事件的名字
        // 参数2:该自定义事件的回调函数中对应的参数
        this.$emit('addTodo',todo)
        // 清空文本框的数据
        this.title = ''
      }
    }
  }
}


</script>
<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
