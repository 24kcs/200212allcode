<template>
  <div>
    <h1>EventTest组件</h1>
    <!--html标签上只能绑定原生事件监听-->
    <button @click="showMsg1">测试原生事件</button>
  
    <hr/>
    <!--此时绑定的事件不是原生事件监听,所以,不会触发-->
    <!-- <Event1 @click="showMsg2" /> -->
   
    <hr/>
    <!--此时绑定的是原生事件监听,并且自动的绑定到了组件内部的根标签上,内部使用了事件委托-->
    <Event1 @click.native="showMsg3" />
     <!--触发组件标签的自定义事件,怎么办呢?-->
     <Event2 @click="showMsg4" @xxx="showMsg5" />
  
   
  </div>
</template>

<script type="text/ecmascript-6">
// 引入两个子级组件
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  // 注册组件
  components: {
    Event1,
    Event2
  },

  methods: {
    // 按钮的原生点击事件对应的回调函数
    showMsg1(event) {
      alert('触发了' + event.target.innerHTML)
    },
    // 组件Event1的点击事件对应的回调函数
    showMsg2() {
      alert('Event1的点击事件')
    },
    // 组件Event1的点击事件加了.native 对应的回调函数
    showMsg3(event) {
      alert(event.target.innerHTML)
    },
    // 第二个组件的自定义事件监听回调
    showMsg4(text) {
      alert(text)
      alert('Event2的自定义事件click触发了')
    },
    showMsg5(obj) {
      alert(obj.age)
      alert('Event2的自定义事件xxx触发了,')
    }
  }
}
</script>
