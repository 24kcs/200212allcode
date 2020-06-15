<template>
  <div class="order-main">
    <div class="container">
      <div class="order-body">
        <!--左侧列表-->
        <div class="order-left">
          <dl>
            <dt><i>·</i> 订单中心</dt>
            <dd>
              
              <router-link to="/center/myorder" replace>我的订单</router-link>
            </dd>
            <dd>
              
               <router-link to="/center/groupbuy" replace>团购订单</router-link>
            </dd>
            <dd>本地生活订单 </dd>
            <dd>我的预售</dd>
            <dd>评价晒单</dd>
            <dd>取消订单记录</dd>
          </dl>
          <dl>
            <dt><i>·</i> 关注中心</dt>
            <dd>关注的商品 </dd>
            <dd>关注的店铺</dd>
            <dd>关注的专辑 </dd>
            <dd>关注的品牌</dd>
            <dd>关注的活动 </dd>
            <dd>浏览历史</dd>
          </dl>
          <dl>
            <dt><i>·</i> 特色业务</dt>
            <dd>我的营业厅 </dd>
            <dd>京东通信 </dd>
            <dd>定期送 </dd>
            <dd>京东代下单</dd>
            <dd>我的回收单 </dd>
            <dd>节能补贴</dd>
            <dd>医药服务 </dd>
            <dd>流量加油站 </dd>
            <dd>黄金托管</dd>
          </dl>
          <dl>
            <dt><i>·</i> 客户服务</dt>
            <dd>返修退换货 </dd>
            <dd>价格保护 </dd>
            <dd>意见建议 </dd>
            <dd>购买咨询 </dd>
            <dd>交易纠纷 </dd>
            <dd>我的发票</dd>
          </dl>
          <dl>
            <dt><i>·</i> 设置</dt>
            <dd>个人信息 </dd>
            <dd>收货地址 </dd>
          </dl>
        </div>
        <!-- 右侧内容 -->
        <div class="order-right">
          <router-view></router-view>
          <!--猜你喜欢-->
          <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike01.png" />
                </div>
                <div class="attr">
                  <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>3699.00</i>
                </div>
                <div class="commit">已有6人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike02.png" />
                </div>
                <div class="attr">
                  Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4388.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike03.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="./images/itemlike04.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
  }
</script>

<style lang="less" scoped>
  .order-main {
    .container {
      margin: 0 auto;
      width: 1200px;

      .order-body {
        padding: 10px;
        color: #333;

        &:after {
          content: "";
          display: block;
          clear: both;
        }

        //左边
        .order-left {
          float: left;
          width: 16.67%;

          dl {
            line-height: 28px;

            dt {
              font-weight: 700;
              padding: 5px;

              i {
                color: #77b72c;
              }
            }

            dd {
              margin: 0 0 6px;
              border-bottom: 1px solid #ededed;
              text-align: center;
              .router-link-active{
                color:red;
              }
            }
          }
        }

        //右边
        .order-right {
          float: right;
          width: 83.33%;

        

          // 猜你喜欢
          .like {
            border: 1px solid #ddd;
            margin: 15px 20px;

            .kt {
              border-bottom: 1px solid #ddd;
              background: #f1f1f1;
              color: #666;
              margin: 0;
              padding: 12px;
              font-size: 15px;
            }

            .like-list {
              padding: 15px 11px;
              overflow: hidden;

              .likeItem {
                width: 25%;
                float: left;

                .p-img {
                  text-align: left;

                  img {
                    width: 167px;
                    height: 123px;
                  }
                }

                .attr {
                  padding: 0 15px;
                }

                .price {
                  padding: 0 15px;
                  font-size: 16px;
                  color: #c81623;
                  margin-bottom: 20px;
                }

                .commit {
                  padding: 0 15px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>