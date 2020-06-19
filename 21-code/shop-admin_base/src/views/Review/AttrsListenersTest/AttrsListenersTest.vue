<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- <a href="javascript:;" title="添加">
      <el-button type="info" icon="el-icon-plus" size="small">添加</el-button>
    </a>

     <a href="javascript:;" title="修改">
      <el-button type="primary" icon="el-icon-edit" size="small">修改</el-button>
    </a>

     <a href="javascript:;" title="删除">
      <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
    </a> -->
    

    <!--
     封装一个高级的组件(目的,为了方便使用)
     v-bind指令----强制绑定属性,v-bind="{ id: someProp, 'other-attr': otherProp }"
     v-on指令----绑定事件监听,  v-on="{ mousedown: doThis, mouseup: doThat }"
     $attrs属性也是对象,该对象内部包含标签(组件)上传递的所有的属性(不包括prop,class,style)
     $listeners属性也是对象,该对象内部包含标签(组件)上传递的所有的自定义事件监听
    -->

   <!-- <LinkButton title="添加" type="info" icon="el-icon-plus" size="small" @click="add" />
   <LinkButton title="修改" type="info" icon="el-icon-plus" @click="update" @dblclick="update"  />
   <LinkButton title="删除" type="info"  />
    -->
    <LinkButton title="添加" type="info" icon="el-icon-plus" size="mini" @click="add"  />
    <LinkButton title="修改" type="primary" icon="el-icon-edit" size="small" @click="update"  />
    <LinkButton title="删除" type="danger" icon="el-icon-delete" size="medium" @click="del"  />
  </div>
</template>

<script type="text/ecmascript-6">
import LinkButton from './LinkButton'
export default {
  name: 'AttrsListenersTest',
  components: {
    LinkButton
  },
  methods: {
    add() {
      alert('点击了添加按钮')
    },
    add2() {
      alert('双击了修改按钮')
    },
    update() {
      alert('点击了修改按钮')
    },
    del() {
      alert('点击了删除按钮')
    }
  }
}
</script>
