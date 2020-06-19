<template>
  <!--表单-->
  <el-form inline :model="form">
    <!--一级分类-->
    <el-form-item label="一级分类">
      <el-select v-model="form.category1Id" placeholder="请选择" @change="changeCategory1ListHandle">
        <el-option v-for="c in category1List" :key="c.id" :label="c.name" :value="c.id"></el-option>
      </el-select>
    </el-form-item>

    <!--二级分类-->
     <el-form-item label="二级分类">
      <el-select v-model="form.category2Id" placeholder="请选择" @change="changeCategory2ListHandle">
        <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
      </el-select>
    </el-form-item>

     <!--三级分类-->
     <el-form-item label="三级分类">
      <el-select v-model="form.category3Id" placeholder="请选择">
        <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'CategorySelector',
  data () {
    return {
      // 该对象中需要有category1Id属性,用来存储将来选中下拉框中某一项数据的时候的对应的的一级分类id
      form:{
        category1Id:'', // null 或者 '' 都可以
        category2Id:'', // null 或者 '' 都可以
        category3Id:'', // null 或者 '' 都可以
      },
      category1List:[], // 存储一级分类信息列表数据
      category2List:[], // 存储二级分类信息列表数据
      category3List:[], // 存储三级分类信息列表数据
    }
  },
  mounted () {
    // 调用方法获取一级分类的所有的数据
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类信息列表
    async getCategory1List(){
      const result  = await this.$API.category.getCategorys1()
      if(result.code===200){
        this.category1List = result.data
      }
    },
    // 一级分类的选项发生变化,根据这个变化后的分类的id值,获取二级分类的数据列表
    async changeCategory1ListHandle(category1Id){
      const result =await this.$API.category.getCategorys2(category1Id)
       if(result.code===200){
        this.category2List = result.data
      }
    },
     async changeCategory2ListHandle(category3Id){
      const result =await this.$API.category.getCategorys3(category3Id)
       if(result.code===200){
        this.category3List = result.data
      }
    },
  }
}
</script>
<style scoped>
</style>