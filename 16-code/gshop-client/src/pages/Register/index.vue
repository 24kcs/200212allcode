<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go">
        我有账号，去
        <!-- <a href="login.html" target="_blank">登陆</a> -->
        <router-link to="/login">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input type="text" placeholder="请输入你的手机号" v-model="mobile" name="mobile" v-validate="'required|phone1111'" />
      <span style="color:red">{{errors.first('mobile')}}</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input type="text" placeholder="请输入验证码" v-model="code" name="code" v-validate="'required|code'" />
       
        <!--如果src中直接使用服务器地址及接口的方式,那么点击图片,不会进行图形验证码的切换操作-->
        <!--
          http://182.92.128.115/api/user/passport/code 直接向服务器发送这个请求,并没有经过代理服务器,
          后台生成了一个code值,保存在后台,同时会把图形码以图片的形式返回给浏览器
          发送请求:
          通过代理服务器发送请求,传过去了   手机号/密码/code码 ,后台要读取对应的code与传过去的code进行对比
          对比后是不匹配的,由于2次发送的请求不是相同的方式(一般http引擎与ajax引擎),后台也找不到对应的code值
          结论:图形码是不正确的
        
        
        -->
       <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code" /> -->
      <img ref="code" src="/api/user/passport/code" alt="code" @click="upateCode" />
      <span style="color:red">{{errors.first('code')}}</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="text" placeholder="请输入你的登录密码" v-model="password" name="password" v-validate="'required'"  />
       <span style="color:red">{{errors.first('password')}}</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input type="text" placeholder="请输入确认密码" v-model="password2" name="password2" v-validate="'required'" />
      <span style="color:red">{{errors.first('password2')}}</span>
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="isAgree" />
      <span>同意协议并注册《尚品汇用户协议》</span>
    </div>
    <div class="btn">
      <a href="javascript:" @click="register">完成注册</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      mobile: '199', // 手机号码
      code: '1234', // 图形验证码
      password: '111111', // 密码
      password2: '111111', // 确认密码
      isAgree: true // 是否同意
    }
  },
  methods: {
    // 获取图形码的方法
    upateCode(){
      // 这是成功的操作
      this.$refs.code.src='/api/user/passport/code?time='+Date.now()
    },
    // 注册的方法
    async register() {
      // 获取手机号码,图形验证码,密码及确认密码
      const { mobile, code, password, password2, isAgree } = this
      // 判断是否同意
      if (!isAgree) return
      // 判断密码是否一致
      if (password !== password2) {
        alert('两次密码不一致')
      }
      // 所有的表单的验证都通过了,此时再进行注册操作


      
      // 提交action,发送异步请求
      try {
        // 提交action,进行注册操作
        await this.$store.dispatch('register', { mobile, password, code })
        // 成功了,跳转到登录界面
        this.$router.replace('/login')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;
  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;
    span {
      font-size: 14px;
      float: right;
      a {
        color: #e1251b;
      }
    }
  }
  div:nth-of-type(1) {
    margin-top: 40px;
  }
  .content {
    // text-align: center;
    padding-left: 390px;
    margin-bottom: 18px;
    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }
    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }
    img {
      vertical-align: sub;
    }
  }
  .controls {
    text-align: center;
    input {
      vertical-align: middle;
    }
  }
  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;
    a {
      text-decoration: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>