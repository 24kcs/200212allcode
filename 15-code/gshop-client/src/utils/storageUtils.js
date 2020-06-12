// npm install -S uuidjs
// 引入UUID--用来产生用户临时凭证的
import UUID from 'uuidjs'
export function getUUID(){
  // 从缓存中读取用户临时凭证id值
  let uuid = localStorage.getItem('UUID_KEY')
  // 判断是否读取到
  if(!uuid){
    // 没有读取到,那么就创建uuid
    uuid = UUID.generate()
    // 立刻存储到缓存中
    localStorage.setItem('UUID_KEY',uuid)
  }

  return uuid
}