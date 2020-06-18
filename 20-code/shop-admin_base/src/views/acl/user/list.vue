<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
         <el-input v-model="searchObj.username" placeholder="用户名" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="addUser()" v-if="$hasBP('user.add')">添 加</el-button>
      <el-button type="danger" @click="removeRows()" :disabled="selectedIds.length===0" v-if="$hasBP('user.remove')">批量删除</el-button>
    </div>

    <!-- 用户列表 -->
    <el-table
      border
      v-loading="listLoading"
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55" />

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="150" />

      <el-table-column prop="nickName" label="用户昵称" />

      <el-table-column prop="gmtCreate" label="创建时间" width="180"/>
      <el-table-column prop="gmtModified" label="更新时间" width="180"/>

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <router-link :to="`/acl/user/role/${scope.row.id}?username=${scope.row.username}`" v-if="$hasBP('user.assgin')">
            <HintButton type="info" size="mini" icon="el-icon-user-solid" title="分配角色"/>
          </router-link>
          <HintButton type="primary" size="mini" icon="el-icon-edit" title="修改用户"
            v-if="$hasBP('user.update')" @click="toUpdateUser(scope.row.id)"/>
          <HintButton type="danger" size="mini" icon="el-icon-delete" title="删除用户"
            @click="removeDataById(scope.row.id)" v-if="$hasBP('user.remove')"/>
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
      @current-change="fetchData"
      @size-change="changeSize"
    />

    <AddOrUpdate :isShowDialog="isShowDialog" :id="updateId" 
      @cancel="onCancel" @success="onSuccess"/>
  </div>
</template>

<script>
import AddOrUpdate from './addOrUpdate'
export default {
  name: 'AclUserList',
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 用户列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      selectedIds: [], // 批量选择中选择的记录列表
      isShowDialog: false,
      updateId: '', // 需要更新的用户ID
    }
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.fetchData()
  },

  methods: {

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    addUser(){
      this.isShowDialog = true
    },

    toUpdateUser (id) {
      this.isShowDialog = true
      this.updateId = id
    },

    onCancel () {
      this.isShowDialog = false
      this.updateId = ''
    },

    onSuccess () {
      this.isShowDialog = false
      this.updateId = ''
      this.fetchData(this.page)
    },

    // 加载用户列表数据
    fetchData(page = 1) {
      console.log('翻页。。。' + page)
      // 异步获取远程数据（ajax）
      this.page = page
      this.listLoading = true
      this.$API.user.getPageList(this.page, this.limit, this.searchObj).then(
        result => {
          this.list = result.data.items
          this.total = result.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    // 重置查询表单
    resetData() {
      console.log('重置查询表单')
      this.searchObj = {}
      this.fetchData()
    },

    // 根据id删除数据
    removeDataById(id) {
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return this.$API.user.removeById(id)
      }).then((result) => {
        this.fetchData(this.page)
        if (result.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.selectedIds = selection.map(item => item.id)
    },

    // 批量删除
    removeRows() {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用api
        return this.$API.user.removeUsers(this.selectedIds)
      }).then((result) => {
        this.fetchData(this.page)
        if (result.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },

  components: {
    AddOrUpdate
  }
}
</script>
