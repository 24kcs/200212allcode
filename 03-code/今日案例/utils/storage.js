export default {
  setStorage (val) {
    localStorage.setItem('todos_key', JSON.stringify(this.todos))
  },
  getStorage () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  }
}
