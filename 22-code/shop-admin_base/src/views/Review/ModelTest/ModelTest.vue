<template>
  <div>
    <h2>深入v-model</h2>
    <!--
      v-model指令的本质(原理),自己实现v-model指令的功能
      v-model的本质:使用value属性配合input事件来实现的
    -->
    <input type="text" v-model="msg" />
    <p>{{msg}}</p>
    <hr />
    <!-- 原生标签上使用的本质 -->
    <input type="text" :value="msg2" @input="msg2 = $event.target.value" />
    <p>{{msg2}}</p>

    <hr />
    <!-- 组件标签上使用的本质 -->
    <CustomInput v-model="msg3" />
    <p>{{msg3}}</p>

    <hr />

    <CustomInput :value="msg4" @input="msg4 = $event" />
    <p>{{msg4}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data() {
    return {
      msg: 'abcdef',
      msg2: '12345',
      msg3: 'hello',
      msg4: 'world'
    }
  },
  components: {
    CustomInput
  }
}
</script>
