const Koa = require('koa')
const path = require('path')
const app = new Koa()
const http = require("http");
const cors = require('koa2-cors');
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static'); // 静态文件
const koaBody = require('koa-body');

const routing = require('./routes'); // router路由
const { port } = require('./config')

const { judgeHttpUrl } = require('./utils')

// 允许所有的跨域
// app.use(cors());
// https://www.npmjs.com/package/koa2-cors
// // 设置跨域
app.use(cors({
    origin: function(ctx) {
        // console.log(111, ctx, ctx.url)
        // 设置白名单
        if (judgeHttpUrl(ctx.header.host)) {
            return '*';
        }
        // return ['http://localhost:3092', 'http://www.zhooson.cn']; // 指定域名访问
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 获取额外的header信息
    maxAge: 5, //  该字段可选，用来指定本次预检请求的有效期，单位为秒
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'OPTIONS'], // 请求允许的方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-requested-with'] // 允许的header字段名
}))

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '/public/images'),
        keepExtensions: true,
    },
}));

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

routing(app);

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});