<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 第一个:省略号 开始页码数大于2的情况 -->
    <button disabled v-if="startEnd.start>2">···</button>
    <!-- 连续页码  :class="{active:}"-->
    <!--连续页码是5个  3  4  5  6  7  -->
    <button
      v-for="no in startEnd.end"
      v-if="no>=startEnd.start"
      :key="no"
      :class="{active:currentPage===no}"
      @click="changeCurrentPage(no)"
    >{{no}}</button>
    <!-- 第二个:省略号 结束页码小于总页码数-1的情况 -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}}条</button>
  </div>
</template>

<script>

// var obj2 ={
//   "name":"小浩"
// }
// var obj3={
//   'name':'小浩',
//   'sayHi'(){console.log('好开心啊')}
// }
// console.log(obj3['name'])
// obj3['sayHi']()

// var obj={
//   name:'小浩'
// }
// obj.name
// console.log(obj.name)

export default {
  name: 'Pagination',
  props: {
    // 需要外部组件传递的一个配置对象
    pageConfig: {
      type: Object,
      // 设置当前的一些数据可以有一些默认值
      default: {
        total: 0, // 总的数据条数
        pageSize: 5, // 每页显示多少条数据
        pageNo: 1, // 默认显示第几页的数据---第一页
        showPageNo: 5 // 连续的页码数(一般连续页码是奇数)
      }
    }
  },
  watch: {
    // 这是特殊的写法,因为内部是对象.属性的写法,所以需要使用单引号括起来.
    'pageConfig.pageNo'(val) {
      // val----pageConfig.pageNo 的数据
      // 当前页面指定外部传入的值-----如果页码数发生变化,立刻更新当前组件的页码数
      this.currentPage = val
    }
  },
  data() {
    // 当前组件在初始化的时候,或者说该组件创建的时候,data对象中是否可以直接使用props对象中的数据?是可以的
    // console.log(this.pageConfig.pageNo)
    // 当前组件内部的data对象中可以可以直接访问data中的数据 ---不可以的
    // console.log(this.currentPage) undefined
    return {
      // 默认没有第0页数据,应该显示第一页的数据更为合适
      // currentPage: 0 // 默认显示当前第几页的数据(该数据会根据点击不同页码的按钮而发生变化)
      currentPage: this.pageConfig.pageNo
    }
  },
  methods: {
    // 修改当前选中页码的方法
    changeCurrentPage(page) {
      this.currentPage = page
      // 通知父级组件Search,需要改变当前的页码,同时调用接口发送请求
      this.$emit('changeCurrentPage', page)
    }
  },
  computed: {
    // 计算总的页码数
    totalPages() {
      // 获取总的数据条数和每页的数据条数
      const { total, pageSize } = this.pageConfig
      // 判断: 总条数和每页的数据条数都应该保证数据的正确性:数据不该小于等于0
      if (total <= 0 || pageSize < 0) return 0
      return Math.ceil(total / pageSize)
    },
    // 计算连续页码的开始页码和结束页码
    startEnd() {
      // 开始页码
      let start = 0
      // 结束页码
      let end = 0
      // 当前页码
      const currentPage = this.currentPage
      // 连续页码数
      const showPageNo = this.pageConfig.showPageNo
      // 总的页码数
      const totalPages = this.totalPages
      // 简写,下面的写法到了公司后,如果看见了,能够认识就可以了
      // const {currentPage,totalPages,pageConfig:{showPageNo}} = this
      // 例子:5 6 7 8 9
      // 连续页码的 开始页码数 = 当前页码 - 向下取整(连续页码/2)
      //  开始页码 = 7 - 5/2  = 5
      start = currentPage - Math.floor(showPageNo / 2)
      // 如果开始页码小于1会怎样 0 1 2 3 4 ,不可能出现0的,默认就变成1吧,已经重新修正
      if (start < 1) {
        start = 1
      }
      // 连续页码的 结束页码数 = 当前页码 + 向下取整(连续页码/2)
      //  结束页码 = 7 + 5/2 = 9
      // end = currentPage + Math.floor(showPageNo/2)
      end = start + showPageNo - 1
      // 结束页码大于总页码,需要重新修正, 总页码数:9  当前页码是8      5 6 7 8 9
      if (end > totalPages) {
        // 如果结束页码大于总的页码需要修正
        end = totalPages
        // 如果结束页码最终因为大于总的页码数,当前的结束页码就是总的页码数,那开始的页码数就需要重新修正
        // 总页码数:9  当前页码是8    最终的效果为:   5 6 7 8 9
        start = end - showPageNo + 1
        // 如果只有3页, 连续的页码是5 ,  1 ,2 ,3
        if (start < 1) {
          start = 1
        }
      }
      return { start, end }
    }
  }

  // mounted () {
  //   console.log(this.pageConfig.total)
  // }
  // 初始化之前的生命周期回调
  // beforeCreate () {
  //   console.log('a',this.currentPage)  // a
  // },
  // // 初始化之后的生命周期回调
  // created () {
  //   console.log('b',this.currentPage) // b
  // }
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
