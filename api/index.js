//读取同级目录下的js文件
const files = require.context('./', false, /\.js$/)
let configApis = {}
files.keys().forEach(key => {
  if (key === './index.js' || key === './merge.js') return
  configApis = Object.assign(configApis, files(key))
})


export default configApis