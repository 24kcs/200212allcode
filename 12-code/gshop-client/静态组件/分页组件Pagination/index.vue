<template>
  <!--分页组件-->
  <div class="pagination">
    <!--上一页-->
    <button>上一页</button>
    <!-- 第1页 -->
    <button>1</button>
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
    name: "Pagination",
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
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
