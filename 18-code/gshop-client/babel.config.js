module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component", // babel-plugin-component
      {
        "libraryName": "element-ui", // element-ui 
        "styleLibraryName": "theme-chalk" // 组件中的样式
      }
    ]
  ]
}
