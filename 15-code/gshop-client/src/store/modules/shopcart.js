import { reqAddToCart, reqCartList, reqCheckCartItem, reqDeleteItem } from "@/api"

const state = {
  // 用来存储购物车信息数据的数组
  shopCartList: []
}
const mutations = {
  // 直接修改购物车列表数据操作
  RECEIVE_SHOP_CART_LIST (state, shopCartList) {
    state.shopCartList = shopCartList
  }

}
const actions = {
  // 把商品添加到购车中的操作,仅仅是需要调用一个api接口完成该需要
  // 每个action中的第一个参数是一个相当于store的对象,即使不使用,那也不能随便的省略掉
  // 方式1:
  // async addToCart ({ commit }, { skuId, skuNum, callback }) {
  //   const result = await reqAddToCart(skuId,skuNum)
  //   if (result.code === 200) {
  //     // 接口调用成功了
  //     callback('')
  //   } else {
  //     // 接口调用失败了
  //     callback(result.message || '添加失败了')
  //   }
  // }
  // 方式2:
  async addToCart ({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum)
    // 判断成功或者失败,把字符串的结果进行返回操作(成功:空字符串,失败:非空字符串)
    return result.code === 200 ? '' : (result.message || '添加失败')
  },
  // 获取购物车中商品列表数据
  async getShopCartList ({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('RECEIVE_SHOP_CART_LIST', result.data)
    }
  }
}
const getters = {
  // 总数量
  totalCount (state) {
    // 数组的reduce方法
    return state.shopCartList.reduce((pre, item) => {
      // 总的数量在计算的时候,需要判断当前的商品是否是选中的状态
      // if(item.isCheced===1){
      //   return pre+item.skuNum
      // }else{
      //   return pre
      // }
      return item.isChecked === 1 ? pre + item.skuNum : pre
    }, 0)
  },
  // 总价的价格
  totalPrice (state) {
    return state.shopCartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuPrice * item.skuNum : pre
    }, 0)
  },
  // 是否全选
  isAllCheck (state) {
    // 判断所有的元素是否可以满足条件
    return state.shopCartList.every((item) => item.isChecked === 1)
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}