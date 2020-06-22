<template>
  <!--查询表单-->
  <el-form :inline="true" class="demo-form-inline">

    <!-- 一级分类 -->
    <el-form-item label="一级分类">
      <el-select
        v-model="category1Id"
        placeholder="请选择"
        @change="category1Changed">
        <el-option
          v-for="category in categoryList1"
          :key="category.id"
          :label="category.name"
          :value="category.id"/>
      </el-select>
    </el-form-item>

    <!-- 二级分类 -->
    <el-form-item label="二级分类">
      <el-select
        v-model="category2Id"
        placeholder="请选择"
        @change="category2Changed">
        <el-option
          v-for="category in categoryList2"
          :key="category.id"
          :label="category.name"
          :value="category.id"/>
      </el-select>
    </el-form-item>

    <!-- 三级分类 -->
    <el-form-item label="三级分类">
      <el-select
        v-model="category3Id"
        placeholder="请选择"
        @change="category3Changed">
        <el-option
          v-for="category in categoryList3"
          :key="category.id"
          :label="category.name"
          :value="category.id"/>
      </el-select>
    </el-form-item>

  </el-form>

</template>

<script>
export default {

  data() {
    return {
      // 查询表单数据
      category1Id: null,
      category2Id: null,
      category3Id: null,
      categoryList1: [],
      categoryList2: [],
      categoryList3: []
    }
  },

  // 初始化一级类别
  created() {
    this.$API.category.getCategorys1().then(result => {
      this.categoryList1 = result.data
    })
  },

  methods: {
    // 切换1级类别
    category1Changed() {
      this.categoryList2 = []
      this.categoryList3 = []
      this.category2Id = null
      this.category3Id = null
      this.$API.category.getCategorys2(this.category1Id).then(result => {
        this.categoryList2 = result.data
        this.$emit('listenOnSelect', this.category1Id, 1)
      })
    },

    // 切换2级类别
    category2Changed() {
      this.categoryList3 = []
      this.category3Id = null
      this.$API.category.getCategorys3(this.category2Id).then(result => {
        this.categoryList3 = result.data
        this.$emit('listenOnSelect', this.category2Id, 2)
      })
    },

    // 显示属性列表
    category3Changed() {
      // 子组件向父组件传值
      this.$emit('listenOnSelect', this.category3Id, 3)
    }
  }

}
</script>

