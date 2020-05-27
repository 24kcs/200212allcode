/**
 * 自定义PubSub消息发布/订阅----原理
 * 消息订阅对象----PubSub
 * PubSub.subscribe(msg,subscriber)-------订阅消息
 * PubSub.publish(msg,data)-------异步发布消息
 * PubSub.publishSync(msg,data)-----同步发布消息
 * PubSub.unsubscribe(token)-----取消消息订阅
 * msg----消息名字---可以理解为事件的类型(事件名字)
 * subscriber----回调函数---可以理解为事件对应的回调函数
 * data-----发布消息的时候对应的回调函数中传递的参数数据
 * token----当前这个订阅消息的标识----用来取消消息订阅的
 * 
 * 外部代码
 * PubSub.subscribe('add',f1)---订阅消息
 * PubSub.subscribe('add',f2)---订阅消息
 * PubSub.subscribe('add',f3)---订阅消息
 * 在EventBus中同一个事件绑定多个回调函数---大的容器对象---存储的是事件及对应的回调函数
 * 在PubSub中同一个消息绑定多个回调函数----大的容器对象----存储的是消息及对应的回调函数
 * 每个消息对应的回调函数都应该有个标识,标识用来删除当前这个消息的
 * 一个标识对应一个回调函数
 * 大容器对象:{add:{id_1:f1,id_2:f2}}
 * 
 * 
 * 
 */
(function (window) {
  // 定义一个消息订阅的对象
  const PubSub = {}
  // 定义容器对象,用来存储消息名字及对应的对象{消息名字:{标识:回调函数}}
  let subscribersContainer = {} // 大容器对象
  let id = 0 // 标识的初始值
  // 订阅消息
  PubSub.subscribe = function (msg, subscriber) {
    // 根据消息名字获取对应的回调函数容器对象
    let subscribers = subscribersContainer[msg] // 小容器对象
    // 判断该小容器对象是否存在
    if (!subscribers) {
      // 定义容器对象
      subscribers = {}
      // 以键值对的方式把消息名字及对应的小容器对象存放在大的容器对象中
      subscribersContainer[msg] = subscribers
    }
    const token = 'id_' + ++id  // 'id_1'
    // {add:{标识:回调函数}}
    subscribers[token] = subscriber
    // 把当前的token返回
    return token
  }
  // 外部代码{add:{id_1:f1,id_2:f2}}
  // PubSub.subscribe('add', f4)

  // 异步发布消息
  PubSub.publish = function (msg, data) {
    // 根据消息的名字去大的容器中找小容器对象,当前这个消息对应的回调函数容器对象
    let subscribers = subscribersContainer[msg]
    setTimeout(() => {
      // 判断小容器对象存在不
      if (subscribers) {
        // {id_1:f1,id_2:f2}---这里面的所有的回调函数 f1 f2
        // 对象转数组
        Object.values(subscribers).forEach(subscriber => {
          subscriber(data)
        })
      }
    }, 1000);

  }

  // 同步发布消息
  PubSub.publishSync = function (msg, data) {
    // 根据消息的名字去大的容器中找小容器对象,当前这个消息对应的回调函数容器对象
    let subscribers = subscribersContainer[msg]
    // 判断小容器对象存在不
    if (subscribers) {
      // {id_1:f1,id_2:f2}---这里面的所有的回调函数 f1 f2
      // 对象转数组
      Object.values(subscribers).forEach(subscriber => {
        subscriber(data)
      })
    }
  }

  // 取消消息订阅
  PubSub.unsubscribe = function (token) {
    // token 没有值, token 有标识的值  token有消息名字
    if (typeof token === 'undefined') {
      // 没有传入任何值,干掉所有的消息订阅
      subscribersContainer = {}

    } else if (token.indexOf('id_') !== -1) {
      // 传入的是标识---{'add':{id_1:f1,id_2:f2},'del':{id_3:f3}}---id_1
      // [{id_1:f1,id_2:f2},{id_3:f3}]
      // 对象转数组
      const subscribers = Object.values(subscribersContainer).find(subscribers => subscribers[token])
      // 存在则干掉标识对应的消息
      subscribers && delete subscribers[token]
    } else {
      // 传入了消息的名字---{add:{id_1:f1,id_2:f2}}
      delete subscribersContainer[token]
    }
  }

  // 向外暴露PubSub
  window.PubSub = PubSub

})(window)