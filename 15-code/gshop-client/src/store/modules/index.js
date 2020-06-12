// 把多个模块进行统一的管理
// 引入home 模块
import home from './home'
// 引入user 模块
import user from './user'
// 引入search 模块
import search from './search'
// 引入detail模块
import detail from './detail'
// 引入shopcart
import shopcart from './shopcart'
export default {
  home,
  user,
  search,
  detail,
  shopcart
}