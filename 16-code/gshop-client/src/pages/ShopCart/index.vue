<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item,index) in shopCartList" :key="item.id">
          <li class="cart-list-con1">
            <!-- <input type="checkbox" name="chk_list" v-model="item.isChecked" /> -->
            <!--isChecked是计算属性,不是函数,既然不是函数,没法传入参数数据-->
            <!-- <input type="checkbox" name="chk_list" :checked="isChecked(index)" /> -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="checkCartItem(item)"
            />
          </li>

          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              value="1"
              minnum="1"
              class="itxt"
              v-model="item.skuNum"
            />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <!--价格*数量-->
            <span class="sum">{{item.skuPrice*item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCartItem2(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- <input class="chooseAll" type="checkbox" v-model="isAllCheck" /> -->
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="checkAll2" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartItems">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{totalCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  computed: {
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    ...mapGetters([
      'totalCount',
      'totalPrice',
      'isAllCheck',
      'selectedCartItems'
    ])
    // 勾选的计算属性
    // isChecked(){
    //   get(index){},
    //   set(){

    //   }
    // }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    // 获取购物车数据的操作
    getCartList() {
      this.$store.dispatch('getShopCartList')
    },
    // 删除当前的商品,根据skuId
    async deleteCartItem1(skuId) {
      // 友好的提示信息
      if (window.confirm('确定删除吗')) {
        const errorMsg = await this.$store.dispatch('deleteCartItem', skuId)
        if (!errorMsg) {
          // 重新获取购物车数据的操作
          this.getCartList()
        } else {
          alert(errorMsg)
        }
      }
    },
    // 删除当前的商品,根据skuId 第二种写法
    async deleteCartItem2(skuId) {
      // 友好的提示信息
      if (window.confirm('确定删除吗')) {
        try {
          await this.$store.dispatch('deleteCartItem2', skuId)
          this.getCartList()
        } catch (error) {
          alert(error.message || '删除失败啦')
        }
      }
    },
    // 删除所有选中的商品
    deleteCartItems() {
      // 获取所有选中的商品的数组
      const { selectedCartItems } = this
      // 如果没有选中的商品,就不处理任何事情
      if (selectedCartItems.length === 0) return
      // 提示
      if (window.confirm('确定要删除吗')) {
        // 定义一个promises的数组
        const promises = []
        // 遍历删除每个选中的商品
        selectedCartItems.forEach(item => {
          // 提交删除某个商品的action
          const promise = this.$store.dispatch('deleteCartItem2', item.skuId)
          // 保存当前的promise
          promises.push(promise)
        })
        // 如果所有的promise都成功了,重新获取购物车的数据
        Promise.all(promises).then(
          () => {
            this.getCartList()
          },
          error => {
            alert(error.message)
          }
        )
      }
    },
    // 设置当前的某个购物项的选中状态操作
    checkCartItem(item) {
      // item就是购物项
      // 选中状态
      const isChecked = item.isChecked === 1 ? 0 : 1
      // 购物项的skuId
      const { skuId } = item
      // 提交action,有可能会成功,也有可能会失败
      this.$store.dispatch('checkCartItem', { skuId, isChecked }).then(
        () => {
          // 成功了
          this.getCartList()
        },
        error => {
          alert(error.message)
        }
      )
    },
    // 所有购物项的全选和全不选的操作
    async checkAll1(event) {
      // 先获取点击了这个复选框的时候的勾选的状态
      const isChecked = event.target.checked * 1 // 转数字
      // 购物车中的每个选项是否勾选的操作---后台并没有可以直接提供这样的一个接口(全选或者全不选的操作)
      // 思路: 还是要获取购物车中所有的购物项，进行单独的一个一个的调用勾选的接口(action)进行操作处理
      // const promises=[]
      // this.shopCartList.forEach(item=>{
      //   const promise = await this.$store.dispatch('checkCartItem',{
      //     skuId:item.skuId,
      //     isChecked,
      //   })
      //   promises.push(promise)
      // })
      const promises = this.shopCartList.reduce((pre, item) => {
        const promise = this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked
        })
        pre.push(promise)
        return pre
      }, [])
      try {
        // 对每个promise对象做统一的处理
        await Promise.all(promises)
        this.getCartList() // 重新获取数据
      } catch (error) {
        alert(error.message)
      }
    },
    async checkAll2(event) {
      // 先获取点击了这个复选框的时候的勾选的状态
      const isChecked = event.target.checked * 1 // 转数字
      const promises = this.shopCartList.map(item => {
        return this.$store.dispatch('checkCartItem', {
          skuId: item.skuId,
          isChecked
        })
      })
      try {
        // 对每个promise对象做统一的处理
        await Promise.all(promises)
        this.getCartList() // 重新获取数据
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>