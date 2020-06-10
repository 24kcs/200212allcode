<template>
  <div class="swiper-container" id="sw1" ref="sw">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    carouselList: Array
  },
  watch: {
    // banners() {
    //    setTimeout(() => {
    //     var mySwiper = new Swiper(this.$refs.sw, {
    //       loop: true, // 循环模式选项
    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination'
    //       },
    //       // 如果需要前进后退按钮
    //       navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev'
    //       }
    //     })
    //    }, 500)
    //   // 定时器,延迟Swiper的创建
    // }

    carouselList: {
      handler() {
        // console.log(val)
        // 一开始如果这个数组数据没有,那么就不用创建Swiper对象
        if(this.carouselList.length===0) return
        // console.log('watch中:',this.carouselList.length)
        this.$nextTick(() => {
          //console.log('1')
          // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
          var mySwiper = new Swiper(this.$refs.sw, {
            loop: true, // 循环模式选项
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
  mounted() {
    // console.log('mounted', this.carouselList.length)
  }
}
/*

当前Carousel 组件如果被创建了(被使用),此时必然会执行mounted这个生命周期回调
mounted回调执行了三次,说明被使用了3次
ListContainer组件内部使用过一次该组件,该组件肯定是被创建了(被使用),所以,mounted肯定会执行一次-----1次
Floor组件内部使用过一次该组件,该组件也被创建使用过了,mounted回调肯定会执行一次,但是Floor组件被v-for指令遍历过(通过循环遍历了,遍历了2次)----所以,Floor组件被遍历的同时,内部的Carousel组件就被使用过-----2次
Carousel组件的mounted生命周期回调函数就执行了三次===================


以下是分析的结果:---没有错,只不过这里的bug就可以解释这个问题
第一次的时候Carousel组件被使用是在ListContainer组件内部,轮播图的数据有4个-----
this.carouselList.length----------------------------4个
第二次和第三次的时候Carousel组件被使用是在Floor组件内部,每个floor组件内轮播图的数据有3个(一共有6个数据)-----
this.carouselList.length----------------------------3个,3个
mounted回调执行结果: 4  3  3

实际上的结果: 0  3  3----肯定是对的


2.ListContainer组件中 Carousel组件 是如何创建的
一开始ListContainer组件中使用了Carousel组件,内部是通过:carouselList="banners" 是传入了这个属性,注意的问题,此时banners数据有没有都不会影响Carousel组件的创建,一开始banners没有数据,但是Carousel组件可以正常的创建出来(此时的banners数据要么在请求的路上,要么在响应的路上,总是此时的banners是没有数据的,但是Carousel组件正在开始创建了),一旦Carousel组件被创建,就会进入到mounted回调中,此时该组件中被传入的banners由于没有数据,所以,this.carouselList.length----0个=================================坑
此时banners传入到了Carousel组件中,内部通过props接收,存储到了carouselList数组中,但是没有数据,没有数据,轮播图怎么会显示出来呢------大坑1
一开始组件创建,没有数据,数据就是0,但是此时异步请求正在发送中,组价创建出来后,数据也差不多响应回来了,此时组件中的carouselList数组的数据就会发生变化,一旦变化,就会进入watch中,里面的数据就发生了变化,页面就会更新,Swiper对象就会创建,轮播图的效果就出来了---坑没了




1.Floor组件中 Carousel组件 是如何创建的
Floor组件是在Home组件中使用的,但是Floor组件在创建的时候，或者说该组件在使用的过程中 用到了v-for指令,这是问题的关键
Floor组件中的v-for指令的遍历条件是一个数组,如果该数组有数据,则可以进行遍历操作,既然可以遍历操作,那么Floor组件就可以被创建出来,一旦被创建出来,就说明可以使用该组件了,那么mounted回调就可以被执行,但是,如果v-for指令遍历的数组条件不成立(该数组没有数据,则无法创建该组件Floor)
Floor组件中v-for指令中的floors这个数据是一个数组,该数组一开始没有数据(也就意味着Floor组件是不会被创建的),为什么?
原因是,Home组件内部所有的html结构只有在页面中渲染完毕后(加载后---能够看到页面中的内容,已经显示出来了),mounted生命周期回调才能执行(内部的代码才开始执行),发送异步请求的action(获取floors数组的)才开始提交,这个时候floors数组是没有数据的,但是页面已经渲染完毕了,只不过Floor组件是没有的,那么此时获取floors的数据要么在请求的路上,要么就是在响应的路上,此时floors数组数据已经请求回来了,那么v-for指令遍历的条件就有了,有了之后,可以创建Floor组件了,该组件一旦被创建,那么mounted就会执行,既然是在组件创建后(页面已经加载了)执行了mounted,就说明此时的floors肯定是有了数据后才创建的组件,所以,mounted回调中的this.carouselList.length----------------------------3个,3个
Floor组件能被渲染说明floors数组有数据,既然如此内部用到的Carousel组件也可以被渲染,既然可以被渲染,该组件内部接收的轮播图数据就是3个3个====================================================================================================================================坑
Floor组件中既然有数据,为什么轮播图不能正常的显示出来----大坑2
一开始组件没有被创建,也没有数据,后来通过异步请求的方式获取到了数据,既然有数据,那么组件就会被创建,说明组件在创建的时候数据就已经存在,所以,组件出现在页面的时候,已经加载完了,mounted中就有了数据,既然组件已经创建完毕,数据也都有了,那么数据此后再也没有变化过(此时的数据是3个,只不过渲染了2次),既然如此,就不会进入到watch中(最开始的时候数据就是3个,从来没有变化过,所以不会进入到watch中),那么Swiper对象也不会被创建,所以,轮播图就没有效果


而且watch为什么就执行了一次-----大坑3---原因就是一开始大轮播图的数据是0个,后来根据发送的请求响应回来的数据变化了,就会执行watch中代码,而Floor组件内部的轮播图数据一开始就有,后面没有发生过变化,所以,就不会进入到watch中

结果:mounted执行了3次,watch执行了一次
解决:让watch监视的时候,立刻执行回调,----最少应该执行3次




组件上使用了指令,不一定因为用到了指令组件渲染就有条件,要看当前的指令是否需要什么条件才能执行
例如: <p v-for="item in items"></p>



*/
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>