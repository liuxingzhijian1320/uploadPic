## 图床

## 初始化项目

```
1. npm install -g koa-generator
2. koa2 [你的项目名称]
// 或者 koa2 [你的项目名称] -e --ejs // 一般使用ejs的模版
3. npm install
4. npm i nodemon -D // 安装nodemon
5. "dev": "./node_modules/.bin/nodemon app.js"  // package.json 的scripts
```

## 改造 koa-generator 生成好的模版

1. 修改 routes （便于便于管理 router 文件）

```
  // 删除
  const index = require('./routes/index')
  const users = require('./routes/users')
  app.use(index.routes(), index.allowedMethods())
  app.use(users.routes(), users.allowedMethods())


  // 添加 (具体看代码)
  const routing = require('./routes'); // router路由
  routing(app);

```

2. 安装 koa-static koa-body

```
const koaStatic = require('koa-static'); // 静态文件
const koaBody = require('koa-body');

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/images'),
        keepExtensions: true,
    },
}));

```

### 1. 生成 token

1. 下载 jsonwebtoken koa-jwt

2. 签发 token

```
 const token = jwt.sign({ name }, secret, { expiresIn: '100s' });
```

3. token 校验
   查看 middleware 的 auth.js

4. auth 的运用. 在 router 中 添加 auth 的中间件

### 2. 游客上传（24H 自动删除）
