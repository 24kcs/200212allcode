<template>
  <div>
    <h2>Event2组件</h2>
    <button @click="$emit('click','哈哈')">分发自定义click事件</button><br>
    <button @click="$emit('xxx',{age:18})">分发自定义xxx事件</button><br>
  </div>
</template>
