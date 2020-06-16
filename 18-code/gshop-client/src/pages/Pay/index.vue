<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单
            <em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：
            <em>145687</em>
          </span>
          <span class="fr">
            <em class="lead">应付金额：</em>
            <em class="orange money">￥{{payInfo.totalFee}}</em>
          </span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持
            <span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，
          <span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li>
              <img src="./images/pay2.jpg" />
            </li>
            <li>
              <img src="./images/pay3.jpg" />
            </li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li>
                <img src="./images/pay10.jpg" />
              </li>
              <li>
                <img src="./images/pay11.jpg" />
              </li>
              <li>
                <img src="./images/pay12.jpg" />
              </li>
              <li>
                <img src="./images/pay13.jpg" />
              </li>
              <li>
                <img src="./images/pay14.jpg" />
              </li>
              <li>
                <img src="./images/pay15.jpg" />
              </li>
              <li>
                <img src="./images/pay16.jpg" />
              </li>
              <li>
                <img src="./images/pay17.jpg" />
              </li>
              <li>
                <img src="./images/pay18.jpg" />
              </li>
              <li>
                <img src="./images/pay19.jpg" />
              </li>
              <li>
                <img src="./images/pay20.jpg" />
              </li>
              <li>
                <img src="./images/pay21.jpg" />
              </li>
              <li>
                <img src="./images/pay22.jpg" />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span>
              <a href="weixinpay.html" target="_blank">微信支付</a>
            </span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
// 引入QRCode
import QRCode from 'qrcode'
export default {
  name: 'Pay',
  props: ['orderId'],
  computed: {
    ...mapState({
      payInfo: state => state.order.payInfo
    })
  },
  // 界面加载的生命周期回调
  mounted() {
    // 必然要获取传递过来的orderId的这个数据
    // const orderId = this.$route.query.orderId
    const orderId = this.orderId
    // 发送请求获取订单支付信息
    this.$store.dispatch('getPayInfo', orderId)
  },
  methods: {
    // 支付操作
    pay() {
      // 通过插件调用方法传入codeUrl 获取支付的二维码图片
      QRCode.toDataURL(this.payInfo.codeUrl)
        .then(imgUrl => {
          // 显示二维码图片
          this.$alert(`<img src="${imgUrl}" />`, '请使用微信扫码支付', {
            // 这里是一个配置对象
            dangerouslyUseHTMLString: true, // 解析html标签内容
            showCancelButton: true, // 显示取消按钮
            cancelButtonText: '支付中遇到问题',
            confirmButtonText: '已成功支付',
            center: true, // 居中显示
            showClose: true // 是否显示右上角的x
          })
            .then(() => {
              // 清理定时器
              clearInterval(this.timeId)
              // 关闭二维码对话框-----
              this.$msgbox.close()
              // 跳转界面
              this.$router.push('/paysuccess')
            })
            .catch(error => {
              // console.log('点的是关闭')
              clearInterval(this.timeId)
               this.$message.warning('请联系前台的漂亮妹妹客服')
            })

          // 支付的操作---可以获取当前支付的状态,但是不能做到实时更新的获取支付的状态
          this.timeId = setInterval(() => {
            this.$API
              .reqOrderStatus(this.orderId)
              .then(result => {
                // console.log(result.code, result.message)
                // 支付成功
                if (result.code === 200) {
                  // 清理定时器
                  clearInterval(this.timeId)
                  // 关闭二维码对话框-----
                  this.$msgbox.close()
                  // 跳转界面
                  this.$router.push('/paysuccess')
                  // 支付成功的提示
                  this.$message.success('支付成功')
                }
              })
              .catch(error => {
                // 清理定时器
                clearInterval(this.timeId)
                this.$message.error('支付失败了')
              })
          }, 3000)

          //  跳转界面到支付成功的界面
          // this.$router.push('/paysuccess')
        })
        .catch(error => {
          this.$message.error('支付二维码生成失败了喽')
        })

      // 最终要跳转到支付成功的界面
    }
  }
}
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>