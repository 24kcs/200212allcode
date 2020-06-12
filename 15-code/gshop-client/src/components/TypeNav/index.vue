<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowFirst = true" @mouseleave="firstHide">
        <h2 class="all" @mouseenter="hideCategory">全部商品分类</h2>
        <!--优化代码的操作,父级标签应用鼠标离开的事件-->
        <!--通过v-if指令来控制分类列表展示或者隐藏操作-->
        <div class="sort" @mouseleave="currentIndex=-2" @click="toSearch" v-if="isShowFirst">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1,index) in baseCategoryList"
              :key="index"
              :class="{item_on:currentIndex===index}"
              @mouseenter="showSubCategorys(index)"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >{{c1.categoryName}}</a>
                <!-- <router-link
                :to="{path:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                >{{c1.categoryName}}</router-link>-->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="index">
                    <dt>
                      <a
                        href="javascript:;"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                      <!-- <router-link
                      :to="{path:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                      >{{c2.categoryName}}</router-link>-->
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="index">
                        <a
                          href="javascript:;"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                        <!-- <router-link
                        :to="{path:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                        >{{c3.categoryName}}</router-link>-->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入Vuex的辅助函数
import { mapState } from 'vuex'
// 引入lodash----为了使用一个方法,引入了这个的js库,不合适
// import _ from 'lodash'
// 按需引入
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -2, // 默认值,用来存储鼠标进入到div(class为item)的时候设置的索引值
      isShowFirst: true // 默认只有在首页是显示的
    }
  },
  computed: {
    ...mapState({
      baseCategoryList: state => state.home.baseCategoryList
    })
  },
  mounted() {
    // 当分类信息组件TypeNav组件加载后,发送异步请求,获取数据
    // this.$store.dispatch('getBaseCategoryList')
    // 每次组件重新加载后,判断当前页面是不是首页---home----/,如果不是首页/--则隐藏
    if (this.$route.path !== '/') {
      this.isShowFirst = false
    }
  },
  methods: {
    // 鼠标进入的事件----通过函数节流的方式来进行优化操作
    showSubCategorys: throttle(function(index) {
      // 该事件会被触发n次----不合理
      this.currentIndex = index
      // console.log(index)
    }, 300),
    // 通过事件委托的方式实现点击a标签跳转到search组件
    toSearch(event) {
      //  console.log('预成大树,莫与草争,将军有剑,不斩苍蝇')
      // 此时点击a确实可以触发该点击事件,但是点击其他的标签也会触发该事件
      // console.log(event)
      if (event.target.tagName === 'A') {
        //  console.log('点的是a,如果争吵可以解决问题,那么poxx 一定是个高薪职业')
        // 如何传递参数数据
        // console.log(event.target.dataset)
        // 解构出dataset对象中的数据
        const {
          categoryname,
          category1id,
          category2id,
          category3id
        } = event.target.dataset

        // 准备路由跳转的过程中需要传递的参数数据
        const query = { categoryName: categoryname }
        // 判断对应的参数数据中是否有数据,就携带当前的这个数据
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // console.log(query)
        // 实现路由的跳转
        // this.$router.push({ path: 'search', query })
        // TypeNav组件中路由跳转的时候,query传参的时候需要考虑path问题
        // console.log(this.$route.path)
        // console.log(this.$route.params)
        const { path, params } = this.$route
        // 判断当前的path路径中是否有/search
        if (path.indexOf('/search') === 0) {
          // 需求: Home--->Search--->Search,如果回退,能够直接回到Home,使用replace的方法
          this.$router.replace({ path, query, params })
        } else {
          this.$router.push({ path: '/search', query })
        }

        // 点击分类信息后,当前的分类菜单能够隐藏
        this.currentIndex = -2
        this.isShowFirst = false
      }
    },
    // 鼠标离开分类信息菜单,设置是否隐藏当前的信息列表
    firstHide() {
      // 把表达式的索引值清空一下
      this.currentIndex = -2
      if (this.$route.path !== '/') {
        this.isShowFirst = false
      }
    },
    // 全部商品分类
    hideCategory: debounce(function() {
      // 该事件会被触发n次----不合理
      this.currentIndex = -1
      // console.log(this.currentIndex)
    }, 300)
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background-color: #02a774;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>