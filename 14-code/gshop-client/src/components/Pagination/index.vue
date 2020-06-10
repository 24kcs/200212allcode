<template>
  <!--分页组件-->
  <div class="pagination">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled>···</button>
    <!-- 连续页码 -->
    <button>3</button>
    <button>4</button>
    <button class="active">5</button>
    <button>6</button>
    <button>7</button>

    <!-- 省略号 -->
    <button disabled>···</button>
    <!-- 最后一页 -->
    <button>9</button>
    <!--下一页-->
    <button>下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 30 条</button>
  </div>
</template>

<script>
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
        showPages: 5 // 连续的页码数(一般连续页码是奇数)
      }
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
    }
  }
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
