// 封装api接口函数
// 引入二次封装的axios
import ajax from './ajax'
// 引入二次封装的mockAjax
import mockAjax from './mockAjax'
// 获取三级分类信息数据列表的接口地址 http://47.93.148.192/api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax(`/product/getBaseCategoryList`)
// 登录接口
export const reqLogin = (mobile, password) => ajax.post(`/user/passport/login`, { mobile, password })


// 定义接口
// 获取大轮播图的数据
export const reqBanners=()=>mockAjax.get('/banners')
// 获取的是楼层的数据
export const reqFloors=()=>mockAjax.get('/floors')

// 获取搜索数据
export const reqProductList = (searchParams)=>ajax.post('/list',searchParams)
