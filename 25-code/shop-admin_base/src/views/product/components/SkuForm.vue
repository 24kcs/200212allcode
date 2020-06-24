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
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back">返回</el-button>
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
      this.skuInfo.skuDefaultImg = spuImage.imgUrl
    },
    // 表格中的选中框的选中内容发生变化,立刻更新 选中图片数组的数据
    handleSelectionChange(val) {
      this.selectedImageList = val
    },
    // 保存sku操作
    async save() {
      // 整理skuInfo对象相关的参数数据---收集数据

      const { skuInfo, attrList, saleAttrList, selectedImageList } = this
      // 筛选的操作(把带有attrIdValue这个属性的attrList数组中的对象 拿出来, 存放在skuInfo对象的skuAttrValueList数组中)
      // 收集选中的平台属性的相关数据的数组
      skuInfo.skuAttrValueList = attrList.reduce((pre, attr) => {
        // 获取当前这个对象的attrIdValueId属性的数据,并且切割的操作
        const attrIdValueId = attr.attrIdValueId
        // 如果有这个属性,就说明用户选中了某个平台属性,就应该获取里面的attr的id和value的id
        if (attrIdValueId) {
          const [attrId, valueId] = attrIdValueId.split('_')
          pre.push({
            attrId,
            valueId
          })
        }
        return pre
      }, [])
      // 至此 平台属性的相关数据全部的搞定了
      // console.log(skuInfo.skuAttrValueList)

      // 收集销售属性的数据
      // saleAttrList 里面是所有的销售属性数据(前提:spu中添加了多少个就有多少个)
      // skuInfo对象中 有skuSaleAttrValueList 数组数据
      // saleAttrValueId 最终只有用户在页面中选中了某个销售属性的值,那么 此时就会有这个属性
      //
      // console.log(saleAttrList)

      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((pre, attr) => {
        const saleAttrValueId = attr.saleAttrValueId
        if (saleAttrValueId) {
          pre.push({
            saleAttrValueId
          })
        }

        return pre
      }, [])

      // console.log(skuInfo.skuSaleAttrValueList)

      // 收集图片数组数据 从imageList收集 ，但是这个数组的数据不准确,原因:这里的数据是展示所有图片的数组数据,而用户在选择图片的时候,有可能没有做 全选图片的操作,而是 选了几个 或者某几个 ，或者 个别的 图片,所以,imageList数组中直接获取图片数据不准确
      // skuInfo对象中 skuImageList 的数据  从 用户选择的图片后的保存了选中的图片的数组中进行获取 selectedImageList
      skuInfo.skuImageList = selectedImageList.map(item => ({
        imgName: item.imgName,
        imgUrl: item.imgUrl,
        isDefault: item.isDefault,
        spuImgId: item.id
      }))
      //console.log(selectedImageList)

      // console.log(skuInfo.skuImageList)

      // 调用接口发送请求

      const result = await this.$API.sku.addOrUpdateSku(skuInfo)
      if (result.code === 200) {
        // 提示信息
        this.$message.success('保存SKU成功')
        // 通知父级组件
        this.$emit('saveSuccess')

        // 重置数据
        this.resetData()
      } else {
        this.$message.error('保存SKU失败')
      }
    },
    // 返回按钮
    back() {
      this.$emit('cancel')
    },
    // 重置操作
    resetData() {
      this.skuInfo = {
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
      }
      this.spuInfo = {}
      this.attrList = []
      this.saleAttrList = []
      this.imageList = []
      this.selectedImageList = []
    }
  }
}
</script>
<style scoped>
</style>