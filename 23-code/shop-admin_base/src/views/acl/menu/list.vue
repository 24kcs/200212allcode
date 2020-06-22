<template>
  <div>
    <!-- 权限菜单列表 -->
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :expand-row-keys="expandKeys"
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="path"
        label="访问路径"
      />
      <el-table-column
        prop="component"
        label="组件路径"
      />
      <el-table-column
        prop="permissionValue"
        label="权限值"
      />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <HintButton
            v-if="$hasBP('permission.add')"
            :disabled="scope.row.level===4"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleClickAdd(scope.row)"
            :title="getAddTitle(scope.row)"
          />

          <HintButton
            v-if="scope.row.level == 4 &&  $hasBP('permission.update')"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="toUpdatePer(scope.row)"
            title="修改功能"
          >
          </HintButton>

          <HintButton
            v-if="scope.row.level != 4 &&  $hasBP('permission.update')"
            :disabled="scope.row.level===1"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="toUpdateMenu(scope.row)"
            title="修改"
          />

          <HintButton
            v-if="$hasBP('permission.remove')"
            :disabled="scope.row.level===1"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeNode(scope.row)"
            title="删除"
          >
          </HintButton>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/修改子菜单的Dialog -->
    <el-dialog :visible.sync="dialogFormVisible" 
      :title="menu.name ? '修改菜单' : '添加子菜单'">
      <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="menu.path"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menu.component"/>
        </el-form-item>
        <el-form-item label="组件图标" prop="icon">
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option
              v-for="name in svgNames"
              :key="name"
              :label="name"
              :value="name">
              <svg-icon :icon-class="name" style="float: left"/>
              <span style="float: right">{{ name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData">取 消</el-button>
        <el-button type="primary" @click="append">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加功能的Dialog -->
    <el-dialog :visible.sync="dialogPermissionVisible" title="添加功能">
      <el-form ref="permission" :model="permission" :rules="permissionValidateRules" label-width="120px">
        <el-form-item label="功能名称" prop="name">
          <el-input v-model="permission.name"/>
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="permission.path"/>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="permission.component"/>
        </el-form-item>
        <el-form-item label="功能权限值" prop="permissionValue">
          <el-input v-model="permission.permissionValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="restData">取 消</el-button>
        <el-button type="primary" @click="addOrUpdatePermission">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import svgNames from '@/icons'

const menuForm = {
  name: '',
  pid: 0,
  path: '',
  component: '',
  type: '1'
}

const perForm = {
  permissionValue: '',
  type: '2',
  name: '',
  path: '',
  component: '',
  pid: 0
}

export default {
  name: 'AuthMenus',

  data() {

    this.svgNames = svgNames
    console.log('---', svgNames)
    return {
      expandKeys: [],
      filterText: '',
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      menu: menuForm,
      permission: perForm,
      menuValidateRules: {
        name: [{required: true, trigger: 'blur', message: '菜单名必须输入'}],
        path: [{required: true, trigger: 'blur', message: '菜单路径必须输入'}],
        component: [{required: true, trigger: 'blur', message: '组件名称必须输入'}]
      },
      permissionValidateRules: {
        name: [{required: true, trigger: 'blur', message: '功能名称必须输入'}],
        permissionValue: [{required: true, trigger: 'blur', message: '功能权限值必须输入'}]
      }
    }
  },
  
  mounted () {
    this.fetchTreeList()
  },

  methods: {

    /* 
    根据层级得到对应的标题
    */
    getAddTitle (row) {
      if (row.level === 1 || row.level === 2) {
        return '添加子菜单'
      } else if (row.level === 3) {
        return '添加功能'
      }
    },

    /* 
    处理点击添加
    */
    handleClickAdd (row) {
      if (row.level === 1 || row.level === 2) {
        this.dialogFormVisible = true, 
        this.menu.pid = row.id
      } else if (row.level === 3) {
        this.dialogPermissionVisible = true
        this.permission.pid = row.id
      }
    },

    /* 
    请求获取权限菜单数据列表
    */
    fetchTreeList() {
      this.$API.menu.getNestedTreeList().then(result => {
        if (result.success === true) {
          this.menuList = result.data.children
          this.expandKeys = [this.menuList[0].id]
        }
      })
    },

    /* 
    删除某个权限节点
    */    
    removeNode(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.$API.menu.removeById(row.id)
      }).then(() => {
        this.fetchTreeList()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((error) => { 
        if (error === 'cancel') { // 点击了取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else { // 请求失败
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },

    /* 
    添加或更新功能权限
    */
    addOrUpdatePermission() {
      this.$refs.permission.validate(valid => {
        if (valid) {
          if (this.permission.id) {
            this.update(this.permission)
          } else {
            this.$API.menu.savePermission(this.permission).then(result => {
              this.dialogPermissionVisible = false
              this.$message({
                type: 'success',
                message: '添加功能成功'
              })
              // 刷新列表
              this.fetchTreeList()
              this.menu = {...menuForm}
              this.permission = {...perForm}
            })
          }
        }
      })
    },

    /* 
    请求添加一级菜单
    */
    appendLevelOne() {
      this.$API.menu.savePermission(this.menu)
        .then(result => {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '添加一级菜单成功'
          })
          // 刷新页面
          this.fetchTreeList()
          this.menu = {...menuForm}
          this.permission = {...perForm}
        })
        .catch(error => {
          this.dialogFormVisible = false
          this.$message({
            type: 'error',
            message: '添加一级菜单失败'
          })
          this.menu = {...menuForm}
          this.permission = {...perForm}
        })
    },

    /* 
    请求添加二级菜单
    */
    appendLevelTwo() {
      this.$API.menu.savePermission(this.menu)
        .then(result => {
          // 隐藏dialog
          this.dialogFormVisible = false
          // 2、提示成功
          this.$message({
            type: 'success',
            message: "添加二级分类成功"
          })
          // 3、刷新列表
          this.fetchTreeList()
          // 4、把menu清空
          this.menu = {...menuForm}
          this.permission = {...perForm}
        })
        .catch(error => {
          // 1、把文本框关
          this.dialogFormVisible = false
          // 2、提示成功
          this.$message({
            type: 'error',
            message: "添加二级分类失败"
          })
          // 3、把menu清空
          this.menu = {...menuForm}
          this.permission = {...perForm}

        })
    },

    /* 
    确定添加或者更新菜单权限
    */
    append() {
      this.$refs.menu.validate(valid => {
        if (valid) {
          if (!this.menu.id) { // 添加
            if (this.menu.pid == 0) {
              this.appendLevelOne() // 一级菜单的添加
            } else {
              this.appendLevelTwo() // 二级菜单的添加
            }
          } else { // 更新菜单
            this.update(this.menu)
          }
        }
      })
    },

    /* 
    请求更新菜单或功能权限
    */
    update(obj) {
      this.$API.menu.update(obj).then(result => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // 刷新列表
        this.fetchTreeList()
        this.restData()
      })
    },
    
    /* 
    显示菜单添加或更新的dialog
    */
    toUpdateMenu(data) {
      this.dialogFormVisible = true
      this.menu = data
    },

    /* 
    显示功能权限更新的dialog
    */
    toUpdatePer(data) {
      this.dialogPermissionVisible = true
      this.permission = data
    },

    /* 
    重置数据
    */
    restData() {
      this.dialogPermissionVisible = false
      this.dialogFormVisible = false
      this.menu = {...menuForm}
      this.permission = {...perForm}
    }
  }
}
</script>
