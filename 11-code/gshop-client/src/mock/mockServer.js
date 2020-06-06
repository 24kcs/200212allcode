// 引入Mock
import Mock from 'mockjs'
// 引入banners数据
import banners from './banners.json'
// 引入floors数据
import floors from './floors.json'
// 定义返回banners数据的接口
Mock.mock('/mock/banners',{code:200,message:'成功',data:banners})
// 定义返回floors数据的接口
Mock.mock('/mock/floors',{code:200,message:'成功',data:floors})

// 不需要进行暴露 ,让当前的代码必须执行一次即可
console.log('站住,留下买路钱')