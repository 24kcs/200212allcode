<template>
  <!-- 登录 -->
  <div class="login-wrap">
    <div class="login">
      <div class="loginform">
        <ul class="tab clearFix">
          <li>
            <a href="##" style="border-right: 0;">扫描登录</a>
          </li>
          <li>
            <a href="##" class="current">账户登录</a>
          </li>
        </ul>

        <div class="content">
          <form action="##">
            <div class="input-text clearFix">
              <span></span>
              <input type="text" placeholder="邮箱/用户名/手机号" v-model="mobile" />
            </div>
            <div class="input-text clearFix">
              <span class="pwd"></span>
              <input type="text" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="setting clearFix">
              <label class="checkbox inline">
                <input name="m1" type="checkbox" value="2" checked />
                自动登录
              </label>
              <span class="forget">忘记密码？</span>
            </div>
            <button class="btn" @click.prevent="login">登&nbsp;&nbsp;录</button>
          </form>
          <div class="call clearFix">
            <ul>
              <li>
                <img src="./images/qq.png" alt />
              </li>
              <li>
                <img src="./images/sina.png" alt />
              </li>
              <li>
                <img src="./images/ali.png" alt />
              </li>
              <li>
                <img src="./images/weixin.png" alt />
              </li>
            </ul>
            <!-- <a href="##" class="register">立即注册</a> -->
            <router-link to="/register" class="register">立即注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      mobile:'13700000000' , // 手机号码
      password:'111111' // 密码  
    }
  },
 
  methods: {
    // 登录功能------自己去实现登录界面中的 手机号和密码的表单的校验功能
    login(){
      // 获取手机号码和密码
      const {mobile,password} = this
      // 判断帐号和密码不能为空
      if(mobile!=='' && password!==''){
        // 提交异步action
        this.$store.dispatch('login',{mobile,password})
        .then(()=>{
          // 跳转到首页
          this.$router.replace('/')
        })
        .catch(error=>{
          alert(error)
        })
      }else{
        alert('手机号码或者密码不能为空')
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.login-wrap {
  height: 487px;
  background-color: #e93854;
  .login {
    width: 1200px;
    height: 487px;
    margin: 0 auto;
    background: url(./images/loginbg.png) no-repeat;
  }
  .loginform {
    width: 420px;
    height: 406px;
    box-sizing: border-box;
    background: #fff;
    float: right;
    top: 45px;
    position: relative;
    padding: 20px;
    .tab {
      li {
        width: 50%;
        float: left;
        text-align: center;
        a {
          width: 100%;
          display: block;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: 700;
          color: #333;
          border: 1px solid #ddd;
          box-sizing: border-box;
          text-decoration: none;
        }
        .current {
          border-bottom: none;
          border-top-color: #28a3ef;
          color: #e1251b;
        }
      }
    }
    .content {
      width: 380px;
      height: 316px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-top: none;
      padding: 18px;
      form {
        margin: 15px 0 18px 0;
        font-size: 12px;
        line-height: 18px;
        .input-text {
          margin-bottom: 16px;
          span {
            float: left;
            width: 37px;
            height: 32px;
            border: 1px solid #ccc;
            background: url(./images/icons.png) no-repeat -10px -201px;
            box-sizing: border-box;
            border-radius: 2px 0 0 2px;
          }
          .pwd {
            background-position: -72px -201px;
          }
          input {
            width: 302px;
            height: 32px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-left: none;
            float: left;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
            line-height: 22px;
            padding-right: 8px;
            padding-left: 8px;

            border-radius: 0 2px 2px 0;
            outline: none;
          }
        }
        .setting {
          label {
            float: left;
          }
          .forget {
            float: right;
          }
        }
        .btn {
          background-color: #e1251b;
          padding: 6px;
          border-radius: 0;
          font-size: 16px;
          font-family: 微软雅黑;
          word-spacing: 4px;
          border: 1px solid #e1251b;
          color: #fff;
          width: 100%;
          height: 36px;
          margin-top: 25px;
          outline: none;
        }
      }
      .call {
        margin-top: 30px;
        ul {
          float: left;
          li {
            float: left;
            margin-right: 5px;
          }
        }
        .register {
          float: right;
          font-size: 15px;
          line-height: 38px;
        }
        .register:hover {
          color: #4cb9fc;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>