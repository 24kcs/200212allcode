// (function (window) {
// 	const myPlugin = {}
// 	// 暴露该方法
// 	myPlugin.install = function (Vue) {
// 		// 添加一个全局方法
// 		Vue.myGlobalMethod = function () {
// 			console.log('全局方法调用')
// 		}
// 		// 添加一个全局的资源--指令
// 		Vue.directive('my-directive', (el, binding) => {
// 			el.textContent = 'my-directive' + '======' + binding.value
// 		})
// 		// 添加一个实例方法
// 		Vue.prototype.$myMethod = function () {
// 			console.log('实例对象调用')
// 		}
// 	}
// 	window.myPlugin = myPlugin
// })(window)

(function (window) {
	// 定义对象
	const MyPlugin = {}
	MyPlugin.install = function (Vue) {
		Vue.myGlobalMethod = function () {
			console.log('全局方法')
		}
		// 添加一个全局的资源指令
		Vue.directive('my-directive', (el, binding) => {
			el.textContent = 'my-directive' + '======' + binding.value
		})
		// 添加一个实例方法
		Vue.prototype.$myMethod = function () {
			console.log('实例对象方法')
		}
	}
	window.MyPlugin = MyPlugin
})(window)