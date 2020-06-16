<template>
  <div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input type="text" width="100" placeholder="订单号" v-model="searchObj.outTradeNo" clearable/>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="searchObj.orderStatus" clearable placeholder="订单状态">
          <el-option value="UNPAID" label="未支付"/>
          <el-option value="PAID" label="已支付"/>
          <el-option value="WAITING_DELEVER" label="待发货"/>
          <el-option value="DELEVERED" label="已发货"/>
          <el-option value="CLOSED" label="已关闭"/>
          <el-option value="FINISHED" label="已完结"/>
          <el-option value="SPLIT" label="已拆分"/>
        </el-select>
      </el-form-item>

      <el-form-item label="下单时间">
        <el-date-picker
          v-model="times"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

       <el-form-item label="收货人">
        <el-input type="text" width="100" placeholder="收货人" v-model="searchObj.consignee" clearable/>
      </el-form-item>

      <el-form-item label="收件电话">
        <el-input type="text" width="100" placeholder="收件人电话" v-model="searchObj.consigneeTel" clearable/>
      </el-form-item>

      <el-form-item label="送货地址">
        <el-input type="text" width="150" placeholder="送货地址" v-model="searchObj.deliveryAddress" clearable/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getOrders()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


    <!-- 订单列表 -->
    <el-table
      border
      stripe
      fit
      highlight-current-row
      :data="list"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        label="序号"
        width="50"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="outTradeNo" label="订单号" width="180" />

      <el-table-column prop="totalAmount" label="支付金额(￥)" align="center" />

      <el-table-column prop="consignee" label="收货人" />

      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column prop="expireTime" label="失效时间" />

      <el-table-column prop="orderStatusName" label="订单状态" width="80" />


      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <a href="javascript:" title="查看">
            <el-button size="mini" type="primary" icon="el-icon-thumb" circle></el-button>
          </a>
          <a href="javascript:" title="修改">
            <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          </a>
          <a href="javascript:" title="删除">
            <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="getOrders"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
export default {

  name: 'OrderList',

  data() {
    return {
      loading: true, // 数据是否正在加载
      list: null, // 订单列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单对象
      multipleSelection: [], // 批量选择中选择的记录列表
      times: []
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  mounted() {
    this.getOrders()
  },

  watch: {
    times (value) {
      console.log(value)
      if (value.length===2) {
        this.searchObj.createTimeBegin = value[0]
        this.searchObj.createTimeEnd = value[1]
      }
    }
  },


  methods: {

    /* 
    当页码发生改变的时候
    */
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.getOrders(1)
    },

    /* 
    加载订单列表数据
    */
    getOrders(page = 1) {
      this.page = page

      this.$API.order.getPageList(this.page, this.limit,this.searchObj).then(
        result => {
          this.list = result.data.records
          this.total = result.data.total

          // 数据加载并绑定成功
          this.loading = false
        }
      )
    },

    /* 
    重置查询表单
    */
    resetData() {
      this.searchObj = {}
      this.getOrders()
    },

    /* 
    根据id删除数据 (没有接口)
    */
    deleteOrder(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return this.$API.order.removeById(id)
      }).then((result) => {
        this.getOrders(this.page)
        if (result.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch((error) => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      console.log('handleSelectionChange......')
      console.log(selection)
      this.multipleSelection = selection
    }
  }
}
</script>
