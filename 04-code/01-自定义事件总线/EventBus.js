/**
 * Vue中的事件总线-----原理
 * 绑定事件
 * $on('事件类型',回调函数)
 * 分发事件
 * $emit('事件类型',参数数据)
 * 解绑事件
 * $off('事件类型')
 * 自己实现on和emit和off该如何实现
 * 
 * 事件总线---对象---EventBus
 * EventBus.on(eventName,listener)----绑定事件
 * EventBus.emit(eventName,data)----分发事件
 * EventBus.off(eventName)-----解绑事件
 * eventName----事件类型(事件名字)
 * listener----事件监听(回调函数)
 * data----事件对应的回调函数中的参数数据
 * 
 * 绑定事件及分发事件和解绑事件的使用思路:
 * 通过事件总线对象调用on方法进行绑定,然后调用emit方法进行分发,最后通过off方法解绑
 * 例子:
 * EventBus.on('add',f1)
 * EventBus.on('add',f2)
 * EventBus.emit('add',参数)-----f1函数和f2函数中的代码都要执行
 * 绑定的一个事件,实际上可以有多个对应的回调函数
 * 绑定事件的时候,如果存储事件及对应的回调函数(js中存储数据使用数组或者对象)
 * 容器对象:用来存储事件及对应的回调函数
 * {
 *  add:f1,
 *  add:f2
 * }
 * 存储事件及对应回调函数的容器---对象,又由于事件可以对应多个回调函数
 * {
 *  add:[f1,f2,f3,f4]
 * }
 * {add:[f1,f2,f3],del:[f4,f5]}
 * 
 * 
 * 
 * 
 */
// 自调用函数
(function (window) {
  // 定义一个事件总线对象
  const EventBus = {}
  // 定义一个容器,用来存储事件及对应的回调函数,该容器是个对象
  let listenersContainer = {}  // 大的容器
  // 绑定事件
  EventBus.on = function (eventName, listener) {
    // {add:[f1]}
    // 根据事件名字通过容器对象查找该事件对应的数据数组
    let listeners = listenersContainer[eventName]
    // 判断该数组是否存在,不存在,那么就定义数组
    if (!listeners) {
      // 先定义数组
      listeners = [] // 小容器
      // 把事件名字及对应的这个数组以键值对的方式存储到大的容器
      listenersContainer[eventName] = listeners
    }
    // 把回调函数存放在数组中
    listeners.push(listener)
  }
  // 分发事件
  EventBus.emit = function (eventName, data) {
    // 大容器 {del:[f1,f2]}
    // 根据事件名字在大容器对象中找该事件对应的回调函数数组(小容器)
    const listeners = listenersContainer[eventName]
    // 判断该数组是否存在,数组存在不见得数组一定有值,如:[]---没有值
    if (listeners && listeners.length > 0) {
      // 遍历数组,找到数组中存储的每个函数,调用并传入参数即可
      listeners.forEach(listener => {
        listener(data)
      })
    }
  }
  // 解绑事件
  EventBus.off = function (eventName) {
    // 解绑事件可以根据事件名字进行解绑,也可以什么都不传,解绑所有的事件
    // 判断是否传入数据
    // eventName无值
    if (typeof eventName === 'undefined') {
      listenersContainer = {}
    } else {
      // eventName有值
      delete listenersContainer[eventName]
      // 或者
      // listenersContainer[eventName] = []
    }
  }
  // 外部代码  大容器 {add:[f1,f2],del:[f3,f4]}
  // EventBus.off()
  // 暴露出去
  window.EventBus = EventBus
})(window)


