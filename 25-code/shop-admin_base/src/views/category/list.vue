<template>
  <div>
    <el-table
      border
      lazy
      :data="categorys"
      :load="load"
      style="width: 900px;margin-bottom: 20px;"
      :row-key="getRowKey"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @row-click="rowClik"
      :row-class-name="tableRowClassName"
    >
      
      <el-table-column
        prop="id"
        label="分类ID"
        align="center"
        width="150"
      />

      <el-table-column
        prop="name"
        label="分类名称"
        sortable
      />

      <el-table-column label="操作" width="250" align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="categoryName" placeholder="按Enter键添加一级分类"/>
        </template>

        <template slot-scope="scope">
          <HintButton title="添加子分类" :disabled="!scope.row.level" 
            size="mini" type="primary" icon="el-icon-plus"/>
          <HintButton title="修改分类" 
            size="mini" type="primary" icon="el-icon-edit"/>
          <HintButton title="删除分类" 
            size="mini" type="danger" icon="el-icon-delete"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',

  data() {
    return {
      categorys: [], //用于存储所有分类列表的数组
      categoryName: ''
    };
  },

  mounted () {
    this.getCategorys1()
  },

  //方法集合
  methods: {
    getCategorys1 () {
      this.$API.category.getCategorys1().then(result => {
        const categorys = result.data
        categorys.forEach(c => {
          c.hasChildren = true
          c.level = 1
        })
        this.categorys = categorys
        
      })
    },
    
    async load (tree, treeNode, resolve) {
      console.log('---', tree, treeNode)
      if (tree.level===1) {
        const categorys2 = await this.getCategorys2(tree.id)
        resolve(categorys2)
      } else if (tree.level===2) {
        const categorys3 = await this.getCategorys3(tree.id)
        resolve(categorys3)
      }
    },

    getCategorys2 (category1Id) {
      return this.$API.category.getCategorys2(category1Id).then(result => {
        const categorys2 = result.data
        if (categorys2 && categorys2.length>0) {
          categorys2.forEach(item => {
            item.hasChildren = true
            item.level = 2
          })
          return categorys2
        } else {
          return []
        }
      })
    },

    getRowKey (row) {
      return row.level + '-' + row.id
    },

    getCategorys3 (category2Id) {
      return this.$API.category.getCategorys3(category2Id).then(result => {
        const categorys3 = result.data
        if (categorys3 && categorys3.length>0) {
          return categorys3
        } else {
          return []
        }
      })
    },

    rowClik(row){
      const rowKey = this.getRowKey(row)
    },

    tableRowClassName({row, rowIndex}) {
      // console.log('+++', row, rowIndex)
      if (row.level === 2) {
        return 'level2-row'
      } 
    },
  }
}
</script>
<style>
.el-table .level2-row {
  background: #f0f9eb;
}
</style>