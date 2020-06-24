<template>
  <!--表单-->
  <el-form inline :model="form">
    <!--一级分类-->
    <el-form-item label="一级分类">
      <el-select v-model="form.category1Id" placeholder="请选择" @change="changeCategory1ListHandle" :disabled="isDisabled">
        <el-option v-for="c in category1List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>

    <!--二级分类-->
    <el-form-item label="二级分类">
      <el-select v-model="form.category2Id" placeholder="请选择" @change="changeCategory2ListHandle" :disabled="isDisabled">
        <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
      </el-select>
    </el-form-item>

    <!--三级分类-->
    <el-form-item label="三级分类">
      <el-select v-model="form.category3Id" placeholder="请选择" @change="changeCategory3ListHandle" :disabled="isDisabled">
        <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CategorySelector',
  data() {
    return {
      // 该对象中需要有category1Id属性,用来存储将来选中下拉框中某一项数据的时候的对应的的一级分类id
      form: {
        category1Id: '', // null 或者 '' 都可以
        category2Id: '', // null 或者 '' 都可以
        category3Id: '' // null 或者 '' 都可以
      },
      category1List: [], // 存储一级分类信息列表数据
      category2List: [], // 存储二级分类信息列表数据
      category3List: [], // 存储三级分类信息列表数据
      isDisabled:false
    }
  },
  mounted() {
    // 调用方法获取一级分类的所有的数据
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类信息列表
    async getCategory1List() {
      const result = await this.$API.category.getCategorys1()
      if (result.code === 200) {
        this.category1List = result.data
      }
    },
    // 一级分类的选项发生变化,根据这个变化后的分类的id值,获取二级分类的数据列表
    async changeCategory1ListHandle(category1Id) {
      // 重置二级和三级分类的id
      this.form.category2Id = null
      this.form.category3Id = null
      // 重置二级分类和三级分类的数组数据
      this.category2List = []
      this.category3List = []
      // 分发父级组件的自定义事件,并传入当前分类的id信息
       this.$emit('categoryChange',{categoryId:category1Id,level:1})
      const result = await this.$API.category.getCategorys2(category1Id)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },
    // 二级分类内容改变的时候
    async changeCategory2ListHandle(category2Id) {
      // 重置二级和三级分类的id
      this.form.category3Id = null
      // 重置二级分类和三级分类的数组数据
      this.category3List = []
        // 分发父级组件的自定义事件,并传入当前分类的id信息
       this.$emit('categoryChange',{categoryId:category2Id,level:2})
      const result = await this.$API.category.getCategorys3(category2Id)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },
    // 三级分类内容选中改变的时候
    changeCategory3ListHandle(category3Id){
      // 向父级组件传递数据
      // 子级组件分发父级组件中的自定义事件
      //

      // console.log(this.form.category1Id,this.form.category2Id,this.form.category3Id)
      this.$emit('categoryChange',{categoryId:category3Id,level:3})
      
    }
  }
}
</script>
<style scoped>
</style>