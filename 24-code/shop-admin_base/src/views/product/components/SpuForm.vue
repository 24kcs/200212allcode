<template>
  <el-form v-show="visible" label-width="100px">
    <!--输入框-->
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="请输入SPU名称" v-model="spuInfo.spuName" />
    </el-form-item>
    <!--下拉框-->
    <el-form-item label="SPU品牌">
      <el-select v-model="spuInfo.tmId">
        <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
      </el-select>
    </el-form-item>
    <!--文本域,描述信息-->
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述" rows="4" v-model="spuInfo.description"></el-input>
    </el-form-item>
    <!--!SPU的图片-->
    <el-form-item label="SPU图片">
      <el-upload
        multiple
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :file-list="spuImageList"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
        <!--提示信息-->
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </el-form-item>
    <!--销售属性-->
    <el-form-item label="销售属性">
      <!--销售属性的下拉框-->
      <el-select
        value
        :placeholder="unSelectedSaleAttrList.length>0?`还有${unSelectedSaleAttrList.length}个可选`:`没有啦`"
      >
        <el-option
          :label="attr.name"
          :value="attr.id"
          v-for="attr in unSelectedSaleAttrList"
          :key="attr.id"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <!--表格-->
      <el-table border inline style="margin-top:20px" :data="spuInfo.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template slot-scope="{row,$index}">
            <!--tag中的内容显示出来,是属于查看模式-->
            <el-tag
              style="margin-left:5px"
              :key="value.id"
              v-for="(value,index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(row.spuSaleAttrValueList,index)"
            >{{value.saleAttrValueName}}</el-tag>
            <!--input中的内容,是属于编辑模式
              v-if中的数据决定着是不是要添加新的数据

              row是当前的销售属性对象
              value是当前的销售属性中  销售属性值对象
            -->
            <el-input
              placeholder="输入属性值"
              style="width:80px"
              class="input-new-tag"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            ></el-input>
            <!--添加属性值的操作-->
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-popconfirm :title="`确定删除属性值吗?`" @onConfirm="deleteValue($index)">
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
    </el-form-item>
    <!--按钮-->
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'SpuForm',
  props: ['visible'],
  data() {
    return {
      spuId: '', // 当前spuId数据
      spuInfo: {
        spuSaleAttrList: []
      }, // spuInfo对象信息数据
      spuImageList: [], // 当前的spu对应的图片列表数据
      trademarkList: [], // 所有的品牌信息数据
      saleAttrList: [], // 所有销售属性列表数据
      // 上传图片需要用到的两个属性
      dialogImageUrl: '', // 上传图片后的地址
      dialogVisible: false, // 是否显示预览

      // 销售属性表格中 展示每个销售属性值 所需要的两个表达式
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    unSelectedSaleAttrList() {
      // 过滤筛选
      const {
        saleAttrList,
        spuInfo: { spuSaleAttrList }
      } = this
      return saleAttrList.filter(
        sa => !spuSaleAttrList.some(ssa => ssa.saleAttrName === sa.name)
      )
    }
  },
  methods: {
    // 点击返回按钮,切换SPU界面
    back() {
      // 隐藏当前的界面,这种方式子级组件不能真正的修改父级组件中传递过来的数据(浏览器会直接报错)
      // this.visible = false
      // 子级组件内部需要分发update事件,
      this.$emit('update:visible', false)
    },
    // 上传图片需要用到的两个方法
    handleRemove(file, fileList) {
      // 再次的更新图片列表数据数组
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      // 更新上传图片的地址
      this.dialogImageUrl = file.url
      // 显示预览的效果
      this.dialogVisible = true
    },
    // 图片上传成功后
    handleSuccess(response, file, fileList) {
      // response ---响应的对象,file是上传图片的信息数据对象,fileList上传的图片的数组数据
      // console.log(response,file,fileList)
      // spuImageList数组 原来有4个数组,现在上传成功后fileList是上传成功后的5个数据
      // 最终应该调用接口把上传成功后的5个数据一起保存起来
      // 更新图片数组数据
      this.spuImageList = fileList
    },

    // 界面显示出来的时候,需要发送4个请求的方法
    initUpdateData(spuId) {
      // 先存储spuId的数据
      this.spuId = spuId
      // 1.获取spuInfo的数据--对象---需要spuId
      this.getSpuInfoById(spuId)
      // 2.获取suInfo对象的图片列表数据---数组---需要spuId
      this.getSpuImageList(spuId)
      // 3. 获取所有的品牌信息列表数据
      this.getTrademarkList()
      // 4. 获取所有的销售属性信息数据
      this.getSaleAttrList()
    },
    // 获取要修改的spuInfo对象
    async getSpuInfoById(spuId) {
      const result = await this.$API.spu.getSpuBySpuId(spuId)
      if (result.code === 200) {
        this.spuInfo = result.data
      }
    },
    // 获取当前spuInfo对象对应的图片信息数据
    async getSpuImageList(spuId) {
      const result = await this.$API.sku.getSpuImageList(spuId)
      if (result.code === 200) {
        const spuImageList = result.data
        // 如果想要把上传的图片都可以正常的展示出来,需要设置name和url两个属性才可以
        // 发送异步请求获取到的图片数组数据中有:imgName,imgUrl 这两个属性
        // console.log(spuImageList)
        // 把imgName的值给name属性, 把imgUrl的值给url属性
        spuImageList.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })

        // 更新图片的数组数据
        this.spuImageList = spuImageList
      }
    },
    // 获取所有的品牌信息数据
    async getTrademarkList() {
      const result = await this.$API.trademark.getTrademarkList()
      if (result.code === 200) {
        this.trademarkList = result.data
      }
    },
    // 获取所有的销售属性数据
    async getSaleAttrList() {
      const result = await this.$API.spu.getSaleAttrList()
      if (result.code === 200) {
        this.saleAttrList = result.data
      }
    },

    // 销售属性表格中,每个销售属性值 可能需要的三个回调函数

    // 移除某个销售属性值数据
    handleClose(valueList, index) {
      valueList.splice(index, 1)
    },
    // 点击添加按钮,进入编辑模式
    showInput(attr) {
      // attr是一个销售属性对象
      // 指定当前的attr销售属性对象的edit为true---->显示文本框--->进入编辑模式
      // attr.edit= true // 这么做是不行的,原因是edit此时是一个非响应式的属性
      // 如果有这个edit属性,设置为true,如果没有edit属性,添加这个属性
      if (attr.hasOwnProperty('edit')) {
        attr.edit = true
      } else {
        this.$set(attr, 'edit', true)
      }
      // 此时进入编辑模式,同时设置文本框的获取焦点

      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    // 回车或者失去焦点后 完成添加属性值的操作
    handleInputConfirm(attr) {
      // attr 是销售属性对象
      // 获取文本框中输入的数据
      const saleAttrValueName = attr.saleAttrValueName
      // 判断是否有数据
      if (saleAttrValueName) {
        // 筛选操作
        const isRepeat = attr.spuSaleAttrValueList.some(
          value => value.saleAttrValueName === saleAttrValueName
        )
        // 判断是否重复
        if (!isRepeat) {
          // 添加属性值
          attr.spuSaleAttrValueList.push({
            saleAttrValueName,
            baseSaleAttrId: attr.baseSaleAttrId
          })
        } else {
          this.$message.warning('不能添加重复的数据')
          return
        }
      }
      // 进入查看模式
      attr.edit = false
      // 清空数据
      attr.saleAttrValueName = ''

      // let inputValue = this.inputValue
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue)
      // }
      // this.inputVisible = false
      // this.inputValue = ''
    },

    // 销售属性表格中的删除操作---删除的是某个销售属性
    deleteValue(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    }
  }
}
</script>
<style scoped>
</style>