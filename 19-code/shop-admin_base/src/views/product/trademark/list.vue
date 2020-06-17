<template>
  <div>
    <!--按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" @click="addShowTrademark">添加</el-button>
    <!--表格-->
    <el-table :data="trademarkList" border stripe v-loading="loading">
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <!--scope.row是这一行的对象-->
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="logo" width="100" height="60" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--template模版标签,作用:用来吧一些标签进行包裹做整体的操作,最终页面中是不会产生该标签的
        slot-scope: 作用域插槽-,暂且不用理他,后面讲
        scope:对象: 当前这一行中要用到的这个数据对象(范围的对象---作用域插槽)  $index属性---索引 row属性
        -->
        <template slot-scope="scope">
          <el-button size="mini" type="warning" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!--
 :current-page="currentPage4" 当前的第几页
 :page-sizes="[100, 200, 300, 400]" 每页可以显示的条数
 :page-size="100" 每页显示多少条数据
 总条数 每页的条数 上一页 后一页 下一页 跳转到第几页
 total, sizes, prev, pager, next, jumper
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="text-align:center;margin-top:20px;"
      background
    ></el-pagination>

    <!--对话框-->
    <!--.sync修饰符要单独的讲解,所以,暂时不用-->
    <el-dialog title="收货地址" :visible="isShowDialog">
      <!--嵌入表单-->
      <el-form :model="form">
        <!--表单中的每一项-->
        <el-form-item label="品牌名称" :label-width="formLabelWidth">
          <el-input v-model="form.tmName" autocomplete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <!--表单中的每一项-->
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
         嘎嘎
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="isShowDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      // 保存当前的品牌信息数据列表
      trademarkList: [],
      page: 1, // 默认第一页
      limit: 3, // 每页的条数
      total: 0, // 总条数数据
      loading: false, // 不显示加载的效果
      form:{
        tmName:'' , // 用来存储品牌名字的
        logoUrl:'' // 用来存储品牌LOGO的
      },
      formLabelWidth: '100px',
      isShowDialog: false // 用来显示或者隐藏当前对话框的
    }
  },
  mounted() {
    // 调用方法获取品牌数据
    this.getTrademarkList()
  },
  methods: {
    // 发送异步请求,获取数据
    async getTrademarkList(page = 1) {
      this.page = page
      // 有加载的效果
      this.loading = true
      // 获取品牌信息列表数据
      const result = await this.$API.trademark.getTrademarkList(
        this.page,
        this.limit
      )
      // 隐藏加载的效果
      this.loading = false
      // 判断是否成功
      if (result.code === 200) {
        // 获取总条数和总数组 数据
        const { records, total } = result.data
        // 更新数据
        this.trademarkList = records
        this.total = total
      } else {
        // 请求失败
        this.$message.error('请求品牌信息失败哦')
        // this.$message({
        //   type:'error',
        //   message:'请求品牌信息失败哦'
        // })
      }
    },
    // 分页组件要用到的两个回调函数

    // 每页显示多少条数据
    handleSizeChange(pageSizes) {
      this.limit = pageSizes
      // 重新获取数据
      this.getTrademarkList()
    },
    // handleCurrentChange(page) {
    //   console.log(`当前页: ${val}`)
    //   this.page = page
    //   this.getTrademarkList()
    // }


    // 点击添加按钮,用来显示当前的 添加品牌的对话框
    addShowTrademark(){
      this.isShowDialog =true
    }
  }
}
</script>

<style>
</style>
