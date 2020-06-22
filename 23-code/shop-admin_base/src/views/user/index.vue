<template>
  <div>
    <!-- 表单组件: 指定搜索条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input type="text" width="100" placeholder="用户名称" v-model="searchObj.loginName" clearable/>
      </el-form-item>
      <el-form-item>
        <el-input type="text" width="100" placeholder="用户姓名" v-model="searchObj.name" clearable/>
      </el-form-item>
      <el-form-item>
        <el-input type="text" width="100" placeholder="手机号" v-model="searchObj.phoneNum" clearable/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getUsers()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格组件: 显示列表 -->
    <el-table
      
      border
      stripe
      fit
      highlight-current-row
      :data="users"
      v-loading="loading"
      element-loading-text="拼命加载中..."
    >
      <el-table-column align="center" label="用户ID" width="100" prop="id"/>

      <el-table-column label="用户名" width="150" prop="loginName" />
      <el-table-column label="手机号" prop="phoneNum" />
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headImg" alt="headImg" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="级别" prop="userLevel" />
      <el-table-column label="操作">
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
      @current-change="getUsers"
      @size-change="changeSize"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'UserList',

    data () {
      return {
        users: [], // 当前页的用户列表
        total: 0, // 数据库中的总记录数
        page: 1, // 默认页码
        limit: 10, // 每页记录数
        loading: false, // 是否正在请求中
        searchObj: {}, // 查询表单对象
      }
    },

    // 初始获取第1页的用户列表显示
    mounted () {
      this.getUsers()
    },

    methods: {
      getUsers (page=1) {
        this.loading = true
        this.$API.clientUser.getPageList(page, this.limit, this.searchObj)
          .then(result => {
            const { records, total } = result.data
            this.total = total
            this.users = records
            this.loading = false
          })
      },

      // 当页码发生改变的时候
      changeSize(size) {
        console.log(size)
        this.limit = size
        this.getUsers()
      },

      resetData () {
        this.searchObj = {}
        this.getUsers()
      }
    }
  }
</script>

