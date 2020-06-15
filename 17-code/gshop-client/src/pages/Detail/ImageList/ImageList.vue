<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImg,index) in skuImageList" :key="skuImg.id">
        <!--设置显示的轮播图数据,同时设置点击小图被选中高亮效果-->
        <img :src="skuImg.imgUrl" @click="changeCurrentIndex(index)" :class="{active:currentIndex===index}" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// 引入Swiper对象
import Swiper from 'swiper'
// 引入vuex的辅助函数
import { mapGetters } from 'vuex'
export default {
  name: 'ImageList',
  data () {
    return {
      currentIndex:0 // 默认的索引值  
    }
  },
  computed: {
    ...mapGetters(['skuImageList'])
  },
  watch: {
    skuImageList: {
      handler(val) {
        // 一开始如果这个数组数据没有,那么就不用创建Swiper对象
        if (val.length === 0) return
        this.$nextTick(() => {
          // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
          var mySwiper = new Swiper(this.$refs.swiper, {
            slidesPerView:5, // 一次显示5项数据
            slidesPerGroup:2 , // 以2项为单位翻页
            // loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    // 修改当前的索引值
    changeCurrentIndex(index){
      // 更新当前的选中的索引数据
      this.currentIndex = index
      // 分发父级组件的自定义事件,同时传入索引值
      this.$emit('changeCurrentIndex',index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>