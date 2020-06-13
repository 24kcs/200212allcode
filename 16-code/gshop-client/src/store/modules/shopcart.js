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
  },
  // 删除商品的操作1
  async deleteCartItem ({ commit }, skuId) {
    const result = await reqDeleteItem(skuId)
    // 判断,商品删除是否成功
    return result.code === 200 ? '' : result.message || '删除失败'
  },
  // 删除商品的操作2
  async deleteCartItem2 ({ commit }, skuId) {
    const result = await reqDeleteItem(skuId)
    if (result.code !== 200) {
      // 因为上面的代码中,没有抛出失败的promise
      // return new Error('删除购物项失败') // 不行的
      // return Promise.reject(new Error('删除购物项失败')) // 这个是可以的
      throw new Error('删除购物项失败')
    }

  },
  // 修改购物项的选中状态
  async checkCartItem ({ commit }, { skuId, isChecked }) {
    const result = await reqCheckCartItem(skuId, isChecked)
    if (result.code !== 200) {
      throw new Error('切换购物项状态失败')
    }
  }
}
// 包含了多个状态数据的计算属性的get方法的对象
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
    return state.shopCartList.length > 0 && state.shopCartList.every((item) => item.isChecked === 1)
  },
  // 获取所有选中的商品---数组(有选中的商品)
  selectedCartItems (state) {
    return state.shopCartList.filter(item => item.isChecked === 1)
    // 自己尝试着使用reduce方法计算一下选中的商品
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}