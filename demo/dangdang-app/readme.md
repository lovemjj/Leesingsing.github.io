#### 当当热销排行榜
```
DEMO描述: 抓取当当网热销排行榜中的数据,存储在本地数据库中;使用ionic框架实现数据展示,通过cordova打包成app
```
1. 使用node.js从当当网上抓取热销书籍数据,使用mongoose中间件存储在mongodb中
2. 使用express框架把数据库中的数据读取出来,做成数据接口供客户端js调用
3. 客户端js使用angularjs框架结合ionic实现⻚面效果
4. 在客户端js开发的时候使用了webpack实现前端代码的模块化
5. 开发好的webapp通过cordova实现打包成手机app
