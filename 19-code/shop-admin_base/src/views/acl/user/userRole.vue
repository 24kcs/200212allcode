<template>
  <div class="app-container">
    <el-form label-position="left" label-width="80px" style="width: 400px">
      <el-form-item label="用户名" style="width: 400px">
        <el-input disabled :value="$route.query.username"></el-input>
      </el-form-item>

      <el-form-item label="角色列表">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="是否全选">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
          全选
        </el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="update" style="width: 100%">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  export default {
    name: 'UserRole',
    data() {
      return {
        checkAll: false,
        checkedCities: [], //已选中
        cities: [], //所有的
        isIndeterminate: true,
        userId: '',
        saveBtnDisabled: false, // 保存按钮是否禁用,
      };
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        if (this.$route.params.id) {
          this.userId = this.$route.params.id
          this.getById(this.userId)
        }
      },
      
      getById(userId) {
        this.$API.user.getAssign(userId).then(result => {
          var jsonObj = result.data.assignRoles
          this.checkedCities = this.getJsonToList(jsonObj, "id")
          this.cities = result.data.allRolesList
        })
      },

      //把json数据转成string再转成对象，根据Key获取value数据
      getJsonToList(json, key) {

        //把JSON字符串转成对象
        var list = JSON.parse(JSON.stringify(json));
        //var list = JSON.parse(json)
        var strText = []
        //遍历这个集合对象，获取key的值
        for (var i = 0; i < list.length; i++) {
          strText.push(list[i][key])
        }
        return strText;

      },

      handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities.map(item => item.id) : [];
        this.isIndeterminate = false;
      },

      handleCheckedCitiesChange(value) {

        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      update() {
        this.saveBtnDisabled = true // 防止表单重复提交
        var ids = this.checkedCities.join(",")
        console.log(ids)
        //修改权限
        this.$API.user.saveAssign(this.userId, ids).then(result => {
          if (result.success) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push({
              path: '/acl/user/list'
            })
          }
        })
      }
    }
  };

</script>
