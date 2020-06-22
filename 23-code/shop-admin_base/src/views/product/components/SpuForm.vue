<template>
  <el-form v-show="visible" label-width="100px">
    <!--输入框-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="请输入SPU名称" />
    </el-form-item>
    <!--下拉框-->
    <el-form-item label="SPU品牌">
      <el-select value>
        <el-option label="A" value="1"></el-option>
        <el-option label="B" value="2"></el-option>
      </el-select>
    </el-form-item>
    <!--文本域,描述信息-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述" rows="4"></el-input>
    </el-form-item>
    <!--!SPU的图片-->
    <el-form-item label="SPU图片">
      <el-upload
        class="avatar-uploader"
        action="/dev-api/admin/product/fileUpload"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <!--销售属性的下拉框-->
      <el-select value>
        <el-option label="C" value="1"></el-option>
        <el-option label="D" value="2"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <!--表格-->
      <el-table border inline style="margin-top:20px">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="属性名"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-popconfirm :title="`确定删除属性  吗?`">
              <HintButton
                title="删除"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!--按钮-->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  props: ['visible'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    // 点击返回按钮,切换SPU界面
    back() {
      // 隐藏当前的界面,这种方式子级组件不能真正的修改父级组件中传递过来的数据(浏览器会直接报错)
      // this.visible = false
      // 子级组件内部需要分发update事件,
      this.$emit('update:visible', false)
    },
    handleAvatarSuccess(res, file) {
      // this.dialogImageUrl = URL.createObjectURL(file.raw)
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
    }
  }
}
</script>
<style scoped>
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