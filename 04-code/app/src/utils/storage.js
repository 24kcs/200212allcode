export default {
  get(){
    return JSON.parse(localStorage.getItem('todos_key')||'[]')
  },
  set(val){
    localStorage.setItem('todos_key',JSON.stringify(val))
  }
}