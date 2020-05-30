// 引入mutation的type
import {REQUEST,REQ_SUCCESS,REQ_ERROR} from './mutation-type'
// 引入axios
import axios from 'axios'
// 包含了多个间接修改状态数据的方法的对象
export default {
  // 发送异步请求,修改状态数据
  async search ({commit},searchName) {
    // 接口地址
    const url = `https://api.github.com/search/users`
    // 第一次修改状态数据
    commit(REQUEST)
    try {
      // 发送异步请求
      const response = await axios.get(url, {
        params: {
          q: searchName
        }
      })
      // 获取响应回来的数据,并解构出想要的三个属性(每个对象中的三个属性)
      const users = response.data.items.map(user => ({
        login: user.login,
        html_url: user.html_url,
        avatar_url: user.avatar_url
      }))
      // 第二次修改状态数据
      commit(REQ_SUCCESS,users)
      // console.log(this.users)
    } catch (error) {
      // 第三次修改状态数据
      commit(REQ_ERROR,error)
    }
  }
}