<template>
  <div style="border: 1px solid red">
    <h2>input包装组件</h2>
    <!--
      :value表示的是当前这个input标签中的value属性的值是动态的, "value"--从父级组件传递过来的(使用props的方式)
      @input事件是当前这个文本框的input事件,该事件触发的时候,自动的分发父级组件传递过来的input事件,同时把当前这个文本框中输入的数据传递给父级组件($event.target.value)
    -->
    <input type="text" :value="value" @input="$emit('input',$event.target.value)" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CustomInput',
  props:['value']
}
</script>
