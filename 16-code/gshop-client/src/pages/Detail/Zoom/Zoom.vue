<template>
  <div class="spec-preview">
    <!--小图-->
    <img :src="imgUrl" />
    <!--div就是小图的大小-->
    <div class="event" ref="event" @mousemove="monseHandle"></div>
    <!--大图-->
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <!--遮挡层-->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// 引入节流
import throttle from 'lodash/throttle'
export default {
  name: 'Zoom',
  props: {
    imgUrl: String,
    bigImgUrl: String
  },
  mounted() {
    // 先获取当前小图的宽和高---宽度就可以(当前的图片是正方形)
    // 获取的最终结果应该设置给遮挡层宽和高
    this.maskWidth = this.$refs.event.clientWidth / 2
  },
  methods: {
    // 鼠标在小图上移动的事件
    monseHandle: throttle(function(event) {
      // 获取鼠标移动的横纵坐标
      const { offsetX, offsetY } = event
      // 计算mask遮挡层的宽
      const maskWidth = this.maskWidth
      // 设置鼠标在遮挡层中间的位置
      let left = 0
      let top = 0
      left = offsetX - maskWidth / 2
      top = offsetY - maskWidth / 2
      // 边界的判断
      left = left < 0 ? 0 : left > maskWidth ? maskWidth : left
      top = top < 0 ? 0 : top > maskWidth ? maskWidth : top
      // 设置遮挡层的let和top
      // 获取遮挡层DOM对象
      const maskDiv = this.$refs.mask
      maskDiv.style.left = left + 'px'
      maskDiv.style.top = top + 'px'
      // 获取右侧的大图
      const bigImg = this.$refs.bigImg
      bigImg.style.left = -2 * left + 'px'
      bigImg.style.top = -2 * top + 'px'
    }, 100)
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>