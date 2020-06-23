<template>

  <div>
    <!--分类组件-->
    <el-card style="margin-bottom:20px">
      <CategorySelector @categoryChange="categoryChange" ref="cs" />
    </el-card>

    <el-card>
      <!--添加属性按钮和表格-->
      <div v-show="isShowAttrValueList">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px" @click="toAddAttr" :disabled="!category3Id">添加属性</el-button>
        <!--表格-->
        <el-table :data="attrList" border>
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="名称" prop="attrName" width="200" align="center"></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag
                type="info"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
              >{{attrValue.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="{row,$index}">
              <HintButton
                title="修改"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="toUpdateAtrrValue(row)"
              />

              <el-popconfirm :title="`确定删除属性 ${row.attrName} 吗?`" @onConfirm="deleteAttr(row.id)">
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
      </div>
      <!--修改平台属性界面-->
      <div v-show="!isShowAttrValueList">
        <el-form inline :model="formAttr">
          <!--文本框-->
          <el-form-item label="属性名称">
            <el-input type="text" v-model="formAttr.attrName" />
          </el-form-item>
        </el-form>
        <!--添加属性值按钮  和   取消按钮-->
        <div style="margin-bottom:20px;">
          <el-button type="primary" icon="el-icon-plus" @click="addValue" :disabled="!formAttr.attrName.trim()">添加属性值</el-button>
          <el-button @click="isShowAttrValueList=true">取消</el-button>
        </div>
        <!--表格-->
        <el-table border :data="formAttr.attrValueList" style="margin-bottom:20px;">
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="属性值列表" prop="valueName" align="center">
            <template slot-scope="{row,$index}">
              <el-input
                :ref="$index"
                v-if="row.edit"
                type="text"
                placeholder="请输入属性值,按enter确定"
                v-model="row.valueName"
                @blur="toViewValue(row)"
                @keyup.enter.native="toViewValue(row)"
              />
              <span
                v-else
                @click="toEditValue(row)"
                style="display:inline-block;width:100%"
              >{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row,$index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗`" @onConfirm="deleteAttrValue($index)">
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
        <!--保存按钮和取消按钮-->
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="!isSaveValid">保存</el-button>
        <el-button type="primary" @click="isShowAttrValueList=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入lodash 插进中的cloneDeep
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'PropList',
  data() {
    return {
      attrList: [], // 平台属性数据列表
      category1Id: '', // null 或者 '' 都可以
      category2Id: '', // null 或者 '' 都可以
      category3Id: '', // null 或者 '' 都可以
      isShowAttrValueList: true, // 切换平台属性列表界面和 修改平台属性值界面的,默认是true
      formAttr: {
        attrName:'',
        attrValueList:[]
      }
    }
  },
  computed: {
    // 平台属性存在并且属性值至少有一个的情况下
    isSaveValid(){
      // return this.formAttr.attrName.trim()&&this.formAttr.attrValueList.length>0
      return this.formAttr.attrName.trim()&&this.formAttr.attrValueList.some(item=>!!item.valueName.trim())
    }
  },
  watch: {
    // 监视 数据 ，设置 分类组件中的下拉框是否禁用
    isShowAttrValueList(val){
      this.$refs.cs.isDisabled = !val
    }
  },
  methods: {
    // 获取平台属性列表属性
    async getAttrList() {
      // 发送异步请求,获取平台属性的信息
      const result = await this.$API.attr.getAttrList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      )
      // 判断
      if (result.code === 200) {
        // 更新平台属性列表数据
        this.attrList = result.data
      }
    },
    // 自定义事件的回调函数,目的是获取选中后的分类的id
    categoryChange({ categoryId, level }) {
      // 只有三级分类信息改变并选中后,才发送请求
      // console.log(categoryId, level)
      if (level === 3) {
        this.category3Id = categoryId
        // 发送异步请求,获取平台属性的信息
        this.getAttrList()
      } else if (level === 1) {
        this.category1Id = categoryId
        // 重置二级分类的id和三级分类的id,重置平台属性数据
        this.category2Id = null
        this.category3Id = null
        this.attrList = []
      } else {
        this.category2Id = categoryId
        // 重置三级分类的id,重置平台属性数据
        this.category3Id = null
        this.attrList = []
      }
      // console.log(this.category1Id,this.category2Id,this.category3Id)

      // 判断level 是1? 还是2? 还是3?
      // 根据不同的级别 进行不同的判断  在合适的级别中进行异步的请求操作
    },
    // 点击 修改 平台属性的按钮,实现平台属性界面和 修改品台属性值界面
    toUpdateAtrrValue(formAttr) {
      // 当前的这个平台属性对象保存起来
      // this.formAttr = formAttr // 说明两个对象的指向相同
      // this.formAttr ={...formAttr} 浅拷贝
      // 深拷贝
      this.formAttr = cloneDeep(formAttr)
      // 显示修改界面
      this.isShowAttrValueList = false
    },
  
    // 删除 某个平台属性中的某个属性值操作
    deleteAttrValue(index) {
      this.formAttr.attrValueList.splice(index, 1)
    },
    // 添加一个属性值的点击事件对应的回调函数
    addValue() {
      // 这个属性值 数组中只要多了一个数据,表格中就等于添加了一个数据
      this.formAttr.attrValueList.push({
        attrId: this.formAttr.id, // 当前这个平台属性的id
        valueName: '',
        // 定义一个标识,这个标识的作用,用来区分当前的这个数据是新添加的还是原有的数据
        // true---新添加的数据,false 就说明这个数据不是新添加
        edit: true
      })

      // 获取新的那个文本框,设置有焦点
      // console.log(this.formAttr.attrValueList.length)
      // 添加了一个属性值之后,页面中的文本框还没有出现呢,你就直接获取焦点,那肯定是不可以的啊
      this.$nextTick(() => {
        this.$refs[this.formAttr.attrValueList.length - 1].focus()
      })
      // this.$refs[this.formAttr.attrValueList.length-1].focus()
    },
    // 文本框失去焦点的事件,展示里面的数据(以查看的方式进行展示,编辑模式---文本框显示出来)
    toViewValue(value) {
      // 判断文本框中是否输入数据
      if (value.valueName) {
        value.edit = false
      }
    },
    // 点击属性值列表中的某个 属性值 进入编辑模式
    toEditValue(value) {
      // 标识如果为true 则切换为编辑模式,如果为false则是查看模式
      // value.edit = true
      // 此时后添加的属性是可以进入编辑模式,原来的数据是不能正常的进入编辑模式的
      // 原因: 原来的数据(调用接口发送请求获取的数据)中没有edit这个属性,新添加的属性中新添加了一个edit属性
      // edit属性是一个标识,标识当前的这个属性是原来的数据还是新添加的数据
      // formAttr是一个响应式的对象,但是对象中的添加的这个edit属性并非是一个响应式的属性,所以,如果该值发生变化,界面是有可能不会发生变化(不会重新渲染的)
      // 把edit变成一个响应式的属性,如果当前的这个属性值对象中没有这个响应式属性,那么就添加,如果有则直接修改即可

      // 判断
      if (!value.hasOwnProperty('edit')) {
        this.$set(value, 'edit', true)
      } else {
        // 此时value对象中有edit这个属性,那么就更新该属性的值
        value.edit = true
      }
    },
    // 点击保存按钮,实现 修改平台属性的操作
    async addOrUpdateAttr() {
      // console.log(this.formAttr)
      // 干掉edit这个属性参数---因为原本的数据中是没有这个参数的
      // this.formAttr.attrValueList.forEach(value=>delete value.edit)
      this.formAttr.attrValueList=this.formAttr.attrValueList.filter(value=>{
        // 删除标识数据
        delete value.edit
        // 筛选的操作,高效的写法
        return !!value.valueName.trim()
      })
      // 调用接口,发送请求
      const result = await this.$API.attr.addOrUpdateAttr(this.formAttr)
      if (result.code === 200) {
        // 提示
        this.$message({
          type: 'success',
          message: `${this.formAttr.id?'更新':'添加'}属性成功`
        })
        // 切换界面的操作
        this.isShowAttrValueList = true
        // 重新获取数据,更新当前的平台属性界面的数据
        this.getAttrList()
      } else {
        this.$message({
          type: 'error',
          message: '更新失败'
        })
      }
    },

    // 点击 添加属性 按钮  显示添加属性及添加属性值的界面(其实就是修改平台属性界面)
    toAddAttr(){
      // 添加一个对象
      this.formAttr={
        attrName:'', // 平台属性名字
        attrValueList:[], // 当前这个平台属性中 的 平台属性值数据数组
        categoryId: this.category3Id, // 三级分类的id
        categoryLevel:3 // 代表的是三级分类
      }
      this.isShowAttrValueList = false
    },
      // 点击气泡对话框中的确认按钮,删除某个平台属性
    async deleteAttr(attrId) {
     
      const result = await this.$API.attr.deleteAttr(attrId) 
      if(result.code===200){
        this.$message.success('删除成功')
        // 重新获取数据
        this.getAttrList()
      }else{
        this.$message.error('删除失败')
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 60px;
}
.save-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

