<template>
  <div>
    <!--分类组件-->
    <el-card style="margin-bottom:20px">
      <CategorySelector @categoryChange="categoryChange" />
    </el-card>

    <el-card>
      <!--添加属性按钮和表格-->
      <div v-show="!isShowSpuForm">
        <!--按钮-->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom:20px"
          :disabled="!category3Id"
        >添加SPU</el-button>
        <!--表格-->
        <el-table :data="spuList" border>
          <el-table-column label="序号" type="index" width="100" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" align="center"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row,$index}">
              <HintButton title="添加SKU" type="primary" icon="el-icon-plus" size="mini" />
              <HintButton title="修改SPU" type="primary" icon="el-icon-edit" size="mini" @click="showUpdateSpuForm(row)" />
              <HintButton title="查看已有的SKU" type="info" icon="el-icon-info" size="mini" />

              <el-popconfirm :title="`确定删除属性 ${row.spuName} 吗?`">
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
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          :current-page="page"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          style="text-align:center;margin-top:20px;"
          background
        ></el-pagination>
      </div>

      <SpuForm :visible.sync="isShowSpuForm" />
    </el-card>
  </div>
</template>

<script>
// 引入SpuForm组件
import SpuForm from '../components/SpuForm'
export default {
  name: 'SpuList',
  components: {
    SpuForm
  },
  data() {
    return {
      spuList: [], // spu信息数据数组
      category1Id: '', // 一级分类id
      category2Id: '', // 二级分类id
      category3Id: '', // 三级分类id
      page: 1, // 当前默认的第一页  页码数
      limit: 3, // 每页的条数
      total: 0, // 总条数数据
      isShowSpuForm: false
    }
  },
  methods: {
    // 获取spu数据列表信息
    async getSpuList(page = 1) {
      this.page = page
      const { limit, category3Id } = this
      // console.log(page,limit,category3Id)
      // 当前的页码,每页的条数,三级分类的id
      const result = await this.$API.spu.getSpuList(
        this.page,
        limit,
        category3Id
      )
      // console.log(result)
      // // 成功或者失败的判断
      if (result.code === 200) {
        // 更新总条数数据和当前spu列表数据
        const { records, total } = result.data
        this.total = total
        this.spuList = records
        // console.log(this.spuList)
      }
    },
    // 自定义事件,分级分类的id发生变化后就会触发该回调函数
    categoryChange({ categoryId, level }) {
      // 只有三级分类信息改变并选中后,才发送请求
      if (level === 1) {
        // 一级分类
        this.category1Id = categoryId
        // 重置二级和三级分类的id及spuList数组
        this.category2Id = null
        this.category3Id = null
        this.spuList = []
        // 重置总条数数据
        this.total = 0
      } else if (level === 2) {
        // 二级分类
        this.category2Id = categoryId
        // 三级分类的id及spuList数组
        this.category3Id = null
        this.spuList = []
        // 重置总条数数据
        this.total = 0
      } else {
        // 三级分类
        this.category3Id = categoryId
        // 重新获取spu列表数据
        this.getSpuList()
      }
    },
    // 修改每页显示的条数
    handleSizeChange(pageSizes) {
      this.limit = pageSizes
      // 重新获取数据
      this.getSpuList()
    },

    // 点击修改按钮  显示修改SPU界面(SpuForm组件)
    showUpdateSpuForm(spuInfo){
      // 修改表达式
      this.isShowSpuForm =true
    }
  }
}
</script>
