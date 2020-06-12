import { reqAddToCart } from "@/api"

const state = {
  // 用来存储购物车信息数据的数组
  shopCartList:[]
}
const mutations = {

}
const actions = {
  // 把商品添加到购车中的操作,仅仅是需要调用一个api接口完成该需要
  // 每个action中的第一个参数是一个相当于store的对象,即使不使用,那也不能随便的省略掉
  async addToCart({commit},{skuId,skuNum}){
    const result =await reqAddToCart(skuId,skuNum)
    if(result.code===200){
      console.log('添加成功了')
    }else{
      console.log('添加失败了')
    }
  }
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}