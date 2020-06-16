<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.roleName" placeholder="角色名称"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 工具条 -->
    <div style="margin-bottom: 20px">
      <el-button type="primary"  @click="addRole" v-if="$hasBP('role.add')">添加</el-button>
      <el-button :disabled="multipleSelection.length === 0" type="danger" @click="removeRows()" v-if="$hasBP('role.remove')">批量删除</el-button>
    </div>

    <!-- 角色列表 -->
    <el-table
      border
      style="width: 960px"
      v-loading="listLoading"
      :data="list"
      stripe
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

      <el-table-column label="角色名称">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.roleName" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="{row}">
          <router-link :to="'/acl/role/auth/'+row.id" v-if="$hasBP('role.acl')">
            <HintButton size="mini" type="info" icon="el-icon-info" title="角色授权"/>
          </router-link>
          <HintButton size="mini" type="primary" icon="el-icon-check" title="确定" 
            @click="updateRole(row)" v-if="$hasBP('role.update') && row.edit"/>
          <HintButton size="mini" type="primary" icon="el-icon-edit" title="修改角色" 
            @click="row.edit= true" v-if="$hasBP('role.update') && !row.edit"/>
          
          <HintButton size="mini" type="danger" icon="el-icon-delete" title="删除角色"
            @click="removeDataById(row.id)" v-if="$hasBP('role.remove')" />
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
  </div>
</template>

<script>

export default {

  name: 'RoleList',

  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: null, // 角色列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {

    cancelEdit(row) {
      row.roleName = row.originRoleName
      row.edit = false
      this.$message({
        message: '取消角色修改',
        type: 'warning'
      })
    },

    updateRole (row) {
      const role = {id: row.id, roleName: row.roleName}
      this.$API.role.updateById(role).then(result => {
        if (result.success) {
          row.edit = false
          row.originRoleName = row.roleName
          this.$message({
            type: 'success',
            message: result.message
          })
        }
      })
    },

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    addRole(){
      this.$prompt('请输入新名称', '添加角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$API.role.save({roleName: value}).then(result => {
          if (result.success) {
            this.fetchData()
            this.$message({
              type: 'success',
              message: result.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        });       
      });
    },

    // 加载角色列表数据
    fetchData(page = 1) {
      // 异步获取远程数据（ajax）
      this.page = page
      this.listLoading = true
      this.$API.role.getPageList(this.page, this.limit, this.searchObj).then(
        result => {
          this.list = result.data.items.map(item => {
            // this.$set(item, 'edit', false)
            item.edit = false
            item.originRoleName = item.roleName
            return item
          })
          this.total = result.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    // 重置查询表单
    resetData() {
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
        return this.$API.role.removeById(id)
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
      this.multipleSelection = selection
    },

    // 批量删除
    removeRows() {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        // console.log(idList)
        })
        // 调用api
        return this.$API.role.removeRows(idList)
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
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>