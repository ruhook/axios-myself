# 个人常用axios配置

个人项目中常用的axios配置，记录出来方便自己（如果有人用也是okk的）。

---
### 目录结构

```
|-- api
    |-- axios
        |-- common
            |-- config.js 配置项
            |-- const.js    一些配置常量
            |-- schema.js   Ajv 结构数据
            |-- utils.js    辅助fn文件
        |-- index.js    axios主文件
    |-- index.js    收集所有的接口模块
    |-- merge.js    api集合文件
    |-- test.js     测试接口模块
```

---
### 文件说明

|file|role|
|:----:|:----|
|config.js|axios配置项，目前存放apiPrefix、timeout|
|const.js|一些常量配置，比如：ERROR，CODE...|
|schema.js|和后台定义的需要返回的数据结构，用Ajv进行验证 |
|utils.js|一些辅助工具和扩展的响应拦截器，比如ajv的验证、业务code码的验证...|
|axios -> index.js|axios实例的生成|
|merge.js|项目的所有api的集成，方便管理|
|test.js|模拟的test的业务模块，模块解耦，方便维护|
|api -> index.js|通过require.context的使用，抛出所有的功能模块，以方便组件中调用，import { getTest } from 'api'， 需配置alias|