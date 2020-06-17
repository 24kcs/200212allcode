// 1.默认导出(只能是一个)
export default {
  age: 18
}
// 2. 分别导出(可以是多个)
export const num1 = 100
export function f1 () { }
// 3. 统一导出(可以是多个)
const name1 = '花花'
const name2 = '华华'
export{
  name1,
  name2
}
const name3 = '强强'
const name4 = '圆圆'
export {
  name3,
  name4
}

