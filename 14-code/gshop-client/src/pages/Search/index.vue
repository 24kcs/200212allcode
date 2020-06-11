<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="javascript:;">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--显示的是分类的信息名字-->
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!--显示的是搜索关键字-->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!--显示的是品牌信息数据-->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>
            <!--显示的是平台属性数据-->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector子级组件(品牌,平台属性)-->
        <SearchSelector :setTrademark="setTrademark" :addProps="addProps" />

        <!--details-->
        <div class="details clearfix">
          <!--排序的操作标签结构-->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:;">综合{{getOrderIcon('1')}}</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:;">价格{{getOrderIcon('2')}}</a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇⬆</a>
                </li>-->
              </ul>
            </div>
          </div>
          <!--展示商品信息的标签结构-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="javascript:;">
                      <img :src="goods.defaultImg" />
                    </a> -->
                    <!-- <router-link :to="{name:'detail',params:{skuId:goods.id}}"> <img :src="goods.defaultImg" /></router-link> -->
                     <router-link :to="`/detail/${goods.id}`"> <img :src="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- <a href="javascript:;" :title="goods.title">{{goods.title}}</a> -->
                       <router-link :to="`/detail/${goods.id}`"> {{goods.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="javascript:;" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页标签结构-->
          <Pagination :pageConfig="{total:productList.total,showPageNo:3,pageNo:options.pageNo,pageSize:options.pageSize}" @changeCurrentPage="getProductList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入SearchSelector 组件
import SearchSelector from './SearchSelector/SearchSelector'
// 引入Vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',
  // 注册组件
  components: {
    SearchSelector
  },
  data() {
    return {
      options: {
        category1Id: '', //一级分类id
        category2Id: '', // 二级分类id
        category3Id: '', // 三级分类id
        categoryName: '', // 分类的名字
        // trademark: '', // '245:华为'  '品牌id:品牌的名字'
        order: '1:desc', // 排序的方式   1---综合, 2---价格, asc---升序   , desc---降序
        pageNo: 1, // 当前第几页
        pageSize: 5, // 每页显示多少条数据
        keyword: '', // 搜索关键字
        props: [] // ['383:6.75-6.84英寸:屏幕尺寸", "385:16GB:机身存储']  多个属性条件组成的一个数组 [属性id:属性值:属性名字]
      }
    }
  },
  computed: {
    // 商品信息数据---数组
    ...mapGetters(['goodsList']),
    // 产品信息对象
    ...mapState({
      productList: state => state.search.productList
    })
  },
  mounted() {
    // 2. 能够跳转到当前的Search界面的组件有两个:TypeNav组件和Header组件
    // 由于跳转过来后,传递的参数有query的方式也有params的方式,根据不同的方式获取不同的参数数据,进行异步请求操作
    const { query, params } = this.$route
    // 准备参数数据
    const options = {
      ...this.options,
      // 重新把this.options对象中的数据覆盖一下
      ...query,
      // 重新把this.options对象中的数据覆盖一下
      ...params
    }
    // console.log(options)
    // 更新参数数据
    this.options = options
    // 1. 页面加载后获取产品信息数据
    this.getProductList()
  },
  methods: {
    // 发送异步请求获取产品信息数据
    getProductList(pageNo=1) {
      this.options.pageNo =pageNo
      // 提交action,获取产品信息数据
      this.$store.dispatch('getProductList', this.options)
    },
    // 重置分类信息操作
    removeCategoryName() {
      this.options.category1Id = '' // 重置
      this.options.category2Id = '' // 重置
      this.options.category3Id = '' // 重置
      this.options.categoryName = '' // 重置
      // 重新获取数据
      // this.getProductList()
      // 地址栏的参数没有清理
      // 重新的跳转当前界面,用于删除query参数,path 可能包含keyword
      this.$router.replace(this.$route.path)
      // console.log(this.$route.path)
    },
    // 重置搜索关键字操作
    removeKeyword() {
      // 分发事件总线中的事件
      this.$bus.$emit('removeKeyword')
      this.options.keyword = '' // 重置

      // 重新获取数据
      // this.getProductList()
      // 地址栏的参数没有清理
      // 重新跳转当前的页面,用于删除params参数,也可能包含query参数
      this.$router.replace({ path: '/search', query: this.$route.query })
    },
    // 获取品牌信息数据,更新当前组件内的options中的trademark数据
    setTrademark(trademarkId, trademarkName) {
      // 设置id和名字--- "245:华为"
      // this.options.trademark = trademarkId + ':' + trademarkName
      // console.log(this.options)
      // 重新的获取产品的信息数据
      // this.getProductList()
      // 点击分类信息的时候,发送的请求中,需要的参数中,trademark是空字符串,既然是空字符串,也就意味着点击分类信息收集发送请求的时候,没有必要携带这个trademark参数数据(如果点击手机分类的信息发送请求的时候,很多参数第一次携带的时候,里面如果是空串,那么可以没有必要携带),用trademark来举例说明一个问题:响应式数据的问题
      // options对象中的trademark干掉了,发送请求的代码也干掉了,但是此时我点击品牌,全部结果: 竟然没有品牌信息了
      // 原因:在data中定义的数据,都是响应式的数据:数据发生变化,界面也会跟着变化(进行渲染)
      // data中options对象是响应式数据,但是后来向options中添加的trademark属性不是响应式的属性数据
      // 原因:响应式对象直接添加的新的属性,内部是没有监视/劫持----没有数据绑定---不是响应式的数据
      // 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。

      this.$set(this.options,'trademark',trademarkId + ':' + trademarkName)
      this.getProductList()

    },
    // 重置品牌信息的操作
    removeTrademark() {
      // 先清空品牌信息的数据
      // this.options.trademark = ''
      // 删除响应式的数据,是不会触发界面更新的,并没有做到真正意义的删除响应式数据
      // delete this.options.trademark
      // console.log(this.options)
      // 重新获取产品信息数据
      // this.getProductList()

      // 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。
      this.$delete(this.options,'trademark')
      this.getProductList()
    },
    // 添加平台属性的回调函数
    addProps(propId, propVal, propName) {
      // props: ["383:6.95英寸及以上:屏幕尺寸"]--->id:属性值:属性名字
      // 更新当前的options对象中的props属性(数组)
      const prop = `${propId}:${propVal}:${propName}`
      // 如果平台属性的属性值相同,点击再次添加就会出现错误信息
      if (this.options.props.indexOf(prop) === -1) {
        this.options.props.push(prop)
        // 提交action获取数据
        this.getProductList()
      }
    },
    // 重置平台属性的数据
    removeProp(index) {
      // 移除某个平台属性的数据
      this.options.props.splice(index, 1)
      // 重新获取产品信息数据
      this.getProductList()
    },
    // 设置排序操作的选项中某个选项是否高亮显示操作
    isActive(orderFlag) {
      // orderFlag---1   ----2
      return this.options.order.indexOf(orderFlag) === 0
    },
    // 排序操作,对产品信息的数据进行排序
    setOrder(flag) {
      /*
        flag:   1   或者   2
        order属性中的数据:
        综合:    '1:desc'--降序  或者 '1:asc'--升序
        价格:    '2:desc'--降序  或者 '2:asc'--升序
      
      */
      // 获取参数数据中的标识信息
      // 解构
      let [ orderFlag, orderType ] = this.options.order.split(':')
      // 判断当前点击项,对比标识,如果标识相同,此时就是在做降序和升序的切换操作
      if (orderFlag === flag) {
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        // 当前点击项肯定是切换了,默认是降序操作,并且重置当前的标识
        orderFlag = flag
        orderType = 'desc'
      }
      console.log(orderType)
      // 重新更新参数数据
      this.options.order = `${orderFlag}:${orderType}`
      // 发送请求
      this.getProductList()
    },
    getOrderIcon(flag){
      // 获取当前参数中的标识及类型
       let [ orderFlag, orderType ] = this.options.order.split(':')
       if(orderFlag===flag){
         return orderType ==='desc'?'⬇':'⬆'
       }else{
         return ''
       }
    },
    // 分页组件分发的事件对应的回调函数
    // changeCurrentPage(page){
    //   // 子级组件点击分页按钮,修改父级组件中的页码数(第几页)
    //   // this.options.pageNo = page
    //   this.getProductList(page)
    // }
  },
  watch: {
    // to是个对象,目标路由信息对象---你要去哪里
    // from是个对象,从哪里来的
    $route(to, from) {
      const { query, params } = to
      const options = {
        ...this.options,
        category1Id: '', // 重置
        category2Id: '', // 重置
        category3Id: '', // 重置
        categoryName: '', // 重置
        ...query,
        ...params
      }
      // 更新参数数据
      this.options = options
      // 1. 页面加载后获取产品信息数据
      this.getProductList()
    }
  }
}
// 把一个数组中的数据放在一个新的数组中,并且展示出来
// var arr1=[1,2,3,4,5]

// var arr2 =[]
// for(var i=0;i < arr1.length; i++ ){
//   arr2.push(arr1[i])
// }

// // es6 新语法

// var arr3=[...arr1]

// var obj1 ={
//   name:'小明',
//   age:10
// }
// // 三点运算符 ----解构
// var obj2={...obj1}
// console.log(obj2)
// var obj1 = {
//   name: '小明',
//   age: 10
// }
// var obj3 = { name: '小红', age: '20',...obj1 }

// console.log('============')
// console.log(obj3)
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>