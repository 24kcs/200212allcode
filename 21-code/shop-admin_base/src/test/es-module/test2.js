// 1.导入 默认导出模块
import test1 from './test1' 
// 简洁语法
import { default as test11 } from './test1'

// 2.导入 分别导出模块
import {num1,f1} from './test1'
// 3.导入 统一导出模块
import {name1,name2,name3,name4} from './test1'
// 4. 导入所有模块
import * as obj from './test1'

console.log(test1) // 对象
console.log('================')
console.log(test11) // 对象
console.log('============')
console.log(num1)
console.log(f1)
console.log('============')
console.log(name1,name2,name3,name4)
console.log('============')
console.log(obj)