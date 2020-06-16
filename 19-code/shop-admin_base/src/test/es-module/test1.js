// 1. 默认导出(只能有一个)
export default {
  m: 1
}

// 2. 分别导出(可以有多个)
export const yyy = 3
export function zzz() {

}

// 3. 统一导出(可以有多个)
const a = 1
const b = 2
const c = 3
export {
  a,
  b,
  c
}
const d = 4
const e = 5
export {
  d,
  e
}
