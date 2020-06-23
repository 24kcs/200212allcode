<template>
  <!--表单-->
  <el-form label-width="120px">
    <!--spu 名称-->
    <el-form-item label="SPU 名称">
      <span>大锤子手机</span>
    </el-form-item>
    <!--sku名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="SKU 名称"></el-input>
    </el-form-item>
    <!--价格-->
    <el-form-item label="SKU 价格">
      <el-input type="number" placeholder="SKU 价格"></el-input>
    </el-form-item>

    <!--重量-->
    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="SKU 重量"></el-input>
    </el-form-item>

    <!--规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" rows="4" placeholder="SKU 规格描述"></el-input>
    </el-form-item>

    <!--平台属性-->
    <el-form-item label="平台属性">
      <!--这里有很多的下拉框,都在表单中-->
      <el-form inline label-width="80px">
        <!--每个下拉框都是一项数据-->
        <el-form-item label="存储卡">
          <el-select value="1">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机身存储">
          <el-select value="1">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <!--这里有很多的下拉框,都在表单中-->
      <el-form inline label-width="80px">
        <!--每个下拉框都是一项数据-->
        <el-form-item label="存储卡">
          <el-select value="1">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机身存储">
          <el-select value="1">
            <el-option label="A" value="1"></el-option>
            <el-option label="B" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--图片列表-->
    <el-form-item label="图片列表">
      <el-table border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SkuForm'
}
</script>
<style scoped>
</style>