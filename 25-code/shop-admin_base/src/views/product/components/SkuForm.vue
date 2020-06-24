<template>
  <!--表单-->
  <el-form label-width="120px">
    <!--spu 名称-->
    <el-form-item label="SPU 名称">
      <span>{{spuInfo.spuName}}</span>
    </el-form-item>
    <!--sku名称-->
    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="SKU 名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <!--价格-->
    <el-form-item label="SKU 价格">
      <el-input type="number" placeholder="SKU 价格" v-model="skuInfo.price"></el-input>
    </el-form-item>

    <!--重量-->
    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="SKU 重量" v-model="skuInfo.weight"></el-input>
    </el-form-item>

    <!--规格描述-->
    <el-form-item label="规格描述">
      <el-input type="textarea" rows="4" placeholder="SKU 规格描述" v-model="skuInfo.skuDesc"></el-input>
    </el-form-item>

    <!--平台属性-->
    <el-form-item label="平台属性">
      <!--这里有很多的下拉框,都在表单中-->
      <el-form inline label-width="100px">
        <!--每个下拉框都是一项数据-->
        <el-form-item
          :label="attr.attrName"
          v-for="attr in attrList"
          :key="attr.id"
          style="margin-bottom:10px"
        >
          <el-select v-model="attr.attrIdValueId">
            <el-option
              :label="value.valueName"
              :value="attr.id+'_'+value.id"
              v-for="value in attr.attrValueList"
              :key="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <!--这里有很多的下拉框,都在表单中-->
      <el-form inline label-width="80px">
        <!--每个下拉框都是一项数据-->
        <el-form-item :label="attr.saleAttrName" v-for="attr in saleAttrList" :key="attr.id">
          <el-select v-model="attr.saleAttrValueId">
            <el-option
              :label="value.saleAttrValueName"
              :value="value.id"
              v-for="(value ,index) in attr.spuSaleAttrValueList"
              :key="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <!--图片列表-->
    <el-form-item label="图片列表">
      <el-table border :data="imageList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="{row,$index}">
            <img :src="row.imgUrl" :alt="row.imgName" style="width:150px;height:150px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-tag type="success" v-if="row.isDefault==='1'">默认</el-tag>
            <el-button type="primary" v-else @click="setDefault(row)">设为默认</el-button>
          </template>
        </el-table-column>
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
  name: 'SkuForm',
  data() {
    return {
      spuInfo: {}, // spu对象数据
      attrList: [], // 平台属性列表数据
      saleAttrList: [], // 销售属性列表数据
      imageList: [], // 图片列表数据
      // attrIdValueId:'' // 保存选中的某个平台属性及该平台属性的属性值的id   '384_3034'
      // 收集skuInfo的参数数据
      skuInfo: {
        // 一开始这个界面初始化的时候就可以收集到的数据
        category3Id: 0, // 三级分类的id
        spuId: 0, // spuId的数据
        tmId: 0, // 品牌的id

        // 表单的数据
        skuName: '', // sku的名字
        price: 0, // 价格
        weight: '', // 重量
        skuDesc: '', // sku的描述

        // 需要提交请求的方式来整理的数据
        skuAttrValueList: [], // 平台属性
        skuSaleAttrValueList: [], // 销售属性
        skuImageList: [], // 图片数据列表

        skuDefaultImg: '', // 默认的显示的图片的地址
        isSale: 0 // 上下架的标识
      },
      selectedImageList: [] // 临时存放选中图片的数组
    }
  },
  methods: {
    // 初始化数据的方法
    initAddData(spuInfo) {
      // 更新spuInfo对象数据
      this.spuInfo = spuInfo
      // skuInfo对象中 初始化的三个数据收集起来
      // 三级分类id
      this.skuInfo.category3Id = spuInfo.category3Id
      // spu的id
      this.skuInfo.spuId = spuInfo.id
      // spu的品牌的id
      this.skuInfo.tmId = spuInfo.tmId

      // 调用方法的方式发送请求
      this.getSpuInfoInitData()
    },
    // 发送三个请求获取相关的数据
    async getSpuInfoInitData() {
      // 获取所有的平台属性---一级分类id,二级分类id,三级分类id
      const { category1Id, category2Id, category3Id, id } = this.spuInfo
      const promise1 = await this.$API.attr.getAttrList(
        category1Id,
        category2Id,
        category3Id
      )
      // 获取所有的销售属性---spu的id
      const promise2 = await this.$API.sku.getSpuSaleAttrList(id)
      // 获取图片列表数据---spu的id
      const promise3 = await this.$API.sku.getSpuImageList(id)
      // 统一处理promise
      const result = await Promise.all([promise1, promise2, promise3])
      // 更新数据
      this.attrList = result[0].data
      this.saleAttrList = result[1].data
      const imageList = result[2].data
      imageList.forEach(item => (item.isDefault = '0'))
      // console.log(this.imageList)
      this.imageList = imageList
      // console.log(this.imageList)
    },
    // 设置图片列表中某个图片被 设置 为 默认
    setDefault(spuImage) {
      // 非响应式的属性,属性发生变化,页面是不会跟着变化的
      // spuImage.isDefalut = '1'
      // 响应式的属性,属性值发生变化,页面也会随之变化,和$nextTick()暂时没有关系
      // this.$set(spuImage,'isDefault','1')
      // console.log('测试')
      // 排他的操作
      this.imageList.forEach(item => (item.isDefault = '0'))
      spuImage.isDefault = '1'
      // console.log(spuImage)
      // 设置为默认的图片后,存储该图片的地址
      this.skuDefaultImg = spuImage.imgUrl
    },
    // 表格中的选中框的选中内容发生变化,立刻更新 选中图片数组的数据
    handleSelectionChange(val) {
      this.selectedImageList = val
    }
  }
}
</script>
<style scoped>
</style>