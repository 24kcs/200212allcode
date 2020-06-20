<template>
  <div>
    <!--分类组件-->
    <el-card style="margin-bottom:20px">
      <CategorySelector @categoryChange="categoryChange" />
    </el-card>

    <el-card>
      <!--添加属性按钮和表格-->
      <div v-show="isShowAttrValueList">
        <!--按钮-->
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px">添加属性</el-button>
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
              <HintButton title="修改" type="primary" icon="el-icon-edit" size="mini" @click="toUpdateAtrrValue(row)" />

              <el-popconfirm :title="`确定删除属性 ${row.attrName} 吗?`" @onConfirm="deleteAttr($index)">
                 <HintButton title="删除" type="danger" icon="el-icon-delete" size="mini" slot="reference" />
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
          <!--添加属性值按钮  和   取消按钮-->
          <div>
            <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
            <el-button >取消</el-button>
          </div>
          <!--表格-->
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PropList',
  data() {
    return {
      attrList: [], // 平台属性数据列表
      category1Id: '', // null 或者 '' 都可以
      category2Id: '', // null 或者 '' 都可以
      category3Id: '', // null 或者 '' 都可以
      isShowAttrValueList:true, // 切换平台属性列表界面和 修改平台属性值界面的,默认是true
      formAttr:{}
    }
  },
  methods: {
    // 自定义事件的回调函数,目的是获取选中后的分类的id
    async categoryChange({ categoryId, level }) {
      // 只有三级分类信息改变并选中后,才发送请求
      // console.log(categoryId, level)
      if (level === 3) {
        this.category3Id = categoryId
        // 发送异步请求,获取平台属性的信息
        const result = await this.$API.attr.getAttrList(
          this.category1Id,
          this.category2Id,
          categoryId
        )
        // 判断
        if (result.code === 200) {
          // 更新平台属性列表数据
          this.attrList = result.data
        }
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
    toUpdateAtrrValue(formAttr){
      // 当前的这个平台属性对象保存起来
      this.formAttr = formAttr // -----------------暂且是没有定期的
      // 显示修改界面
      this.isShowAttrValueList = false
    },
    // 点击气泡对话框中的确认按钮,删除某个平台属性
    deleteAttr(index){
      // console.log(index)
      // 此时是一个假的删除操作,下面的代码后期会进行修改
      this.attrList.splice(index,1)
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

