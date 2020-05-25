(function () {

	// 定义一个插件对象
	const MyPlugin = {}
	MyPlugin.install = function (Vue) {
		// 定义全局方法
		Vue.myGlobalMethod = function () {
			console.log('全局方法')
		}
		// 定义全局资源指令
		Vue.directive('my-direction', (el, binding) => {
			el.textContent = 'my-direction' + '=====' + binding.value
		})

		// 定义实例方法
		Vue.prototype.$myMethod = function () {
			console.log('实例方法')
		}

	}

	// 暴露出去
	window.MyPlugin = MyPlugin

})(window)