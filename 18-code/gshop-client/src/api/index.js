// 封装api接口函数
// 引入二次封装的axios
import ajax from './ajax'
// 引入二次封装的mockAjax
import mockAjax from './mockAjax'
// 获取三级分类信息数据列表的接口地址 http://47.93.148.192/api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax(`/product/getBaseCategoryList`)



// 定义接口
// 获取大轮播图的数据
export const reqBanners = () => mockAjax.get('/banners')
// 获取的是楼层的数据
export const reqFloors = () => mockAjax.get('/floors')

// 获取搜索数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams)

// 获取商品详情信息数据接口
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 添加购物车成功的接口
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 获取购物车列表数据的接口

export const reqCartList = () => ajax.get(`/cart/cartList`)

// 指定购物车中的某一个数据项选中状态的接口
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 删除购物车中的商品项
export const reqDeleteItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

// 登录接口
export const reqLogin = (mobile, password) => ajax.post(`/user/passport/login`, { mobile, password })
// 注册接口
// export const reqRegister=(mobile, password,code)=>ajax.post(`/user/passport/register`,{mobile,password,code})
export const reqRegister = (userInfo) => ajax.post(`/user/passport/register`, userInfo)
// 退出
export const reqLogout = () => ajax.get(`/user/passport/logout`)



// 获取订单详情信息
export const reqTradeInfo = () => ajax.get(`/order/auth/trade`)
// 提交订单
export const reqSubmitOrder = (tradeNo, orderInfo) => ajax({
  method: 'POST',
  url: `/order/auth/submitOrder`,
  params: { tradeNo },
  data: orderInfo
})
// 获取订单的支付信息
export const reqPayInfo = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`)
// 查询支付订单的状态信息
export const reqOrderStatus = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取我的订单列表数据信息
export const reqMyOrders = (page, limit) => ajax.get(`/order/auth/${page}/${limit}`)


