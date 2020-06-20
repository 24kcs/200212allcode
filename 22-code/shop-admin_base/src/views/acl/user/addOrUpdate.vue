<template>
  <el-dialog :title="user.id ? '修改用户' : '添加用户'" :visible.sync="isShowDialog">
      <AddOrUpdate/>
      <el-form ref="user" :model="user" :rules="validateRules" label-width="120px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"/>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="user.nickName"/>
        </el-form-item>
        
        <el-form-item v-if="!user.id" label="用户密码" prop="password">
          <el-input v-model="user.password"/>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>

const validatePass = (rule, value, callback) => {
  if (!value || value.length < 6) {
    callback(new Error('密码不能小于6位'))
  } else {
    callback()
  }
}

export default {
  name: 'AddOrUpdate',
  props: {
    id: {
      type: String,
      default: ''
    },
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      user: {},
      loading: false, // 保存按钮是否禁用,
      validateRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名必须输入' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },

  // 监听器
  watch: {
    id (value) {
      if (value) {
        this.fetchDataById(value)
      } else {
        this.user = {}
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {

    cancel () {
      this.$emit('cancel')
    },

    // 表单初始化
    init() {
      const id = this.user.id
      if (id) {
        this.fetchDataById(id)
      }
    },

    saveOrUpdate() {
      this.$refs.user.validate(valid => {
        if (valid) {
          this.loading = true // 防止表单重复提交
          if (!this.user.id) {
            this.saveData()
          } else {
            this.updateData()
          }
        }
      })
    },

    // 新增用户
    saveData() {
      this.$API.user.save(this.user).then(result => {
        // debugger
        if (result.success) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.loading = false
          this.$emit('success')
        }
      })
    },

    // 根据id更新记录
    updateData() {
      // 用户列表数据的获取
      this.$API.user.updateById(this.user).then(result => {
        if (result.success) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.loading = false
          this.$emit('success')
        }
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      this.$API.user.getById(id).then(result => {
        this.user = result.data.item
      })
    }

  }
}
</script>
