<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add" />
  </div>
</template>
<script>
export default {
  name: 'Header',
  // props: {
  //   addTodo: {
  //     type: Function,
  //     required: true
  //   }
  // },
  data() {
    return {
      title: '' // 文本框中输入的数据
    }
  },
  methods: {
    add() {
      // 获取文本框的数据,同时去空格
      const title = this.title.trim()
      // 存在则添加
      if (title) {
        const todo = {
          id: Date.now(),
          title,
          isCompleted: false
        }
        // this.addTodo(todo)
        this.$emit('addTodo', todo)
        this.title = '' // 清空
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
