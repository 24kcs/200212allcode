<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{userInfo.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;|
            <a href="javascript:;" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###">登录</a>
            <a href="###" class="register">免费注册</a>-->
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a>
          <a href="###">我的购物车</a> -->
          <!--此时有问题-->
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <router-link to="/"><img src="./images/Logo.png" alt /></router-link>
        </a>-->
        <router-link to="/" title="尚品汇" class="logo">
          <img src="./images/Logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      keyword: '' // 获取文本框中输入的数据
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    // 点击搜索按钮实现路由的跳转
    toSearch() {
      // 编程式路由跳转----会出现bug
      // this.$router.push('/search')
      // 解决方式1:指定空的成功的回调和失败的回调
      // this.$router.push('/search',()=>{ },()=>{ })
      // 解决方式2:指定一个空的成功的回调函数,不需要失败的回调函数
      // this.$router.push('/search',()=>{ })
      // 解决方式3:不指定成功的回调,指定空的失败回调
      // this.$router.push('/search',undefined,()=>{ })
      // 解决方式4:指定then和catch
      // this.$router.push('/search').then(()=>{}).catch(()=>{})
      // 仅仅指定then是不可以的
      // this.$router.push('/search').then(()=>{})
      // 解决方式5:指定catch是可以的
      // this.$router.push('/search').catch(()=>{})
      // 如果当前项目中很多位置都可以需要编程式的路由跳转,以上解决方式的代码需要写多次，所以,最好的解决方式,一次解决,多次使用,不必再重复解决该问题,进行统一的处理-----router目录中的index.js文件中解决
      // this.$router.push('/search')
      // 点击当前搜索按钮,实现路由跳转并传递参数(点击按钮的时候,传递参数方式是params的方式)
      // 如果鼠标点击的是分类信息实现路由跳转并传递参数(点击分类信息,传递参数方式是query的方式)
      // 编程式路由在跳转的时候进行传递参数的操作
      // 点击按钮 路由跳转的不同方式传参
      // 以下是编程式路由传参的书写方式-----------------字符串拼接的方式
      // params的方式进行路由传参
      // this.$router.push(`/search/${this.keyword}`)
      // query的方式进行路由传参
      // this.$router.push(`/search?keyword=${this.keyword}`)

      // 以下是编程式路由传参的书写方式----------------------对象的方式
      // query 的方式传参
      // this.$router.push({path:'/search',query:{keyword:this.keyword}})
      // params 的方式传参
      // this.$router.push({ name: 'search', params: { keyword: this.keyword } })

      // 此时通过params 的对象的写法 进行路由跳转并传递参数,有bug,---如果文本框中有数据,可以直接跳转,并传递参数,如果文本框中没有数据,此时无法进行跳转
      // 判断当前文本框中的数据是否存在
      // if(this.keyword){
      //   // 文本框中有数据,则跳转,并传递参数
      //   this.$router.push({ name: 'search', params: { keyword: this.keyword } })
      // }else{
      //   // 文本框中没有数据,则跳转,不需要传递参数
      //   this.$router.push({ name: 'search'})
      // }

      // Header组件跳转到Search组件的时候,没有考虑path的问题,还有query参数的
      const { query, path } = this.$route
      if (this.keyword) {
        // 搜索框中有数据的情况下,还要考虑一下path路径中有没有/search地址,如果有说明此时应该就在search界面,而且分类信息有可能有数据
        if (path.indexOf('/search') === 0) {
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
            query
          })
        } else {
          // 此时不在搜索页面,只需要携带params参数
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword }
          })
        }
        // 文本框中有数据,则跳转,并传递参数
      } else {
        // 说明此时跳转的时候,文本框中没有数据,还要判断此时是否已经在Search界面了
        if (path.indexOf('/search') === 0) {
          this.$router.push({ name: 'search', query })
        } else {
          // 文本框中没有数据,则跳转,不需要传递参数
          this.$router.push({ name: 'search' })
        }
      }
    },
    // 退出的操作
    async logout(){
      if(window.confirm('确定退出吗')){
        try {
          await this.$store.dispatch('logout')
          // 退出后自动跳转到首页
          this.$router.replace('/')
        } catch (error) {
          alert(error.message)
        }
      }
    }
  },
  mounted() {
    // 通过事件总线绑定清空搜索关键字的事件
    this.$bus.$on('removeKeyword', () => {
      this.keyword = ''
    })
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>