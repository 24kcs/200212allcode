<template>
  <div>
    <!--按钮-->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom:20px"
      @click="addShowTrademark"
    >添加</el-button>
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
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="showUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="showDelete(scope.row)"
          >删除</el-button>
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
    <!-- <el-dialog title="收货地址" :visible="isShowDialog" :before-close="()=>isShowDialog=false">
     -->
      <el-dialog title="收货地址" :visible.sync="isShowDialog" >
      <!--嵌入表单-->
      <el-form :model="form" width="80%" :rules="rules" ref="form">
        <!--表单中的每一项-->
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <!--表单中的每一项-->
        <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
          <!--上传图片的组件标签-->
          <!--

             :show-file-list="false" 如果上传了图片,是否需要显示图片的信息
             http://182.92.128.115:8206/admin/product/fileUpload
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',
  data() {
    return {
      // 保存当前这一页的所有的品牌信息数据列表
      trademarkList: [],
      page: 1, // 默认第一页
      limit: 3, // 每页的条数
      total: 0, // 总条数数据
      loading: false, // 不显示加载的效果
      form: {
        tmName: '', // 用来存储品牌名字的
        logoUrl: '' // 用来存储品牌LOGO的
      },
      formLabelWidth: '100px',
      isShowDialog: false, // 用来显示或者隐藏当前对话框的
      rules: {
        tmName: [
          // 是否是必须的, 验证的提示信息  trigger:触发器---->blur 失去焦点则触发该表单验证
          // change ---只要文本框中的数据变化就有验证操作,并提示信息
          { required: true, message: '请输入活动名称' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'change'
          }
        ],
        logoUrl: [{ required: true, message: '请上传图片', trigger: 'change' }]
      }
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
    addShowTrademark() {
      // 清空对话框中的数据
      this.form = {
        tmName: '', // 用来存储品牌名字的
        logoUrl: '' // 用来存储品牌LOGO的
      }
      this.isShowDialog = true
      // 清除所有的表单验证
      // 此时界面还没有更新,Dialog组件对象还没有产生呢,Form组件对象也没有,所以就报错,所以,应该等到当前的组件渲染完毕后再清理表单验证
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 用来上传图片的组件 需要使用到的 回调函数
    handleAvatarSuccess(res, file) {
      // res---response 是上传成功后返回的对象,内部有data--->上传成功后的图片地址信息
      // file ----上传的图片信息的一个对象
      // console.log(res,file)
      // 上传成功后有图片的地址信息---更新到form对象中的logoUrl
      this.form.logoUrl = res.data
      // 清除表单的验证
      this.$refs.form.clearValidate('logoUrl')
    },
    beforeAvatarUpload(file) {
      // 限制上传图片的类型的
      // const isJPG = file.type === 'image/jpeg'
      // 数组中是否包含上传图片的这种类型
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      // 限制上传图片的大小的
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 对话框中的确定按钮的点击事件的回调函数
    addOrUpdateTrademark() {
      // 1 校验数据---表单的验证
      this.$refs['form'].validate(async valid => {
        if (valid) {
          // 表单验证成功
          // 获取当前form对象中是否有id
          const { form } = this
          let result
          if (form.id) {
            // 修改
            result = await this.$API.trademark.updateTrademark(this.form)
          } else {
            // 添加
            // 2 发送请求----品牌名字,品牌的LOGO图片
            result = await this.$API.trademark.addTrademark(this.form)
          }

          // 判断
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: `${form.id ? '更新' : '添加'}品牌成功`
            })
            // 重新获取数据
            this.getTrademarkList()
            // 隐藏当前对话框
            this.isShowDialog = false
          } else {
            this.$message({
              type: 'error',
              message: `${form.id ? '更新' : '添加'}品牌失败`
            })
          }
        }
      })
    },

    // 编辑操作的回调函数
    showUpdate(trademark) {
      // 更新当前的form对象(原因:该对象如果有数据,打开对话框,里面的品牌名字和图片就有数据)
      // 这么做是不合适的,原因:只能改变当前页面中显示的数据,实际上并没有改变后台的真正的数据
      // this.form = trademark
      // 不能改变当前页面中列表的数据,但是仅仅是把这一行的数据展示出来
      this.form = { ...trademark }
      // 打开对话框
      this.isShowDialog = true
    },
    // 删除品牌操作
    showDelete(trademark) {
      // 提示框
      this.$confirm(`确定删除${trademark.tmName}吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 提交请求,实现删除操作
          const result = await this.$API.trademark.deleteTrademark(trademark.id)
          if (result.code === 200) {
            // 提示
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 重新获取数据,此时是第一页
            // this.getTrademarkList(1)
            // this.getTrademarkList(this.page)
            // 如果当前这一页的数据只有一个,被删除了,那么应该显示上一页的数据
            this.getTrademarkList(
              this.trademarkList.length === 1 ? this.page - 1 : this.page
            )
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
