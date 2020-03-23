const Koa = require('koa')
const path = require('path')
const app = new Koa()
const http = require("http");
var cors = require('koa2-cors');
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static'); // 静态文件
const koaBody = require('koa-body');

const routing = require('./routes'); // router路由
const { port } = require('./config')
const url = require('url');

// app.use(async function(ctx, next) {
//     // console.info(44444, ctx.request);
//     // let static = path.resolve(__dirname, "public/images"); // 静态资源目录
//     // let url = ctx.request['header'].host + ctx.request['url'];
//     // let p = path.join(static, url.parse(ctx.request['url']).pathname);
//     // console.info(234234, ctx.request.host)
//     const host = ctx.request['header'].host;
//     console.info(24234, host)

//     // console.info(2341111, ctx.request, url)
//     let whiteList = ['upload.zhooson.cn', 'localhost:3092']
//     if (whiteList.indexOf(host) > -1) {}
//     return await next()
// })

app.use(cors());

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

// http.createServer(responseImages); // 创建服务器


// async function responseImages(req, res) {

//     console.info(23424, responseImages)

//     // 解析 url 中的文件目录处理成绝对路径
//     let p = path.join(static, url.parse(req.url).pathname);

//     // 检测文件路径是否合法，不合法直接返回 Not Found
//     let isExist = await fs.exists(p);

//     if (isExist) {
//         // 获取 referer
//         let refer = req.headers["referer"] || req.headers["referered"];

//         // 存在 referer 继续检测
//         if (refer) {
//             // 请求资源存在 referer，做防盗链处理
//             let referHost = url.parse(refer).hostname;
//             let host = req.headers["host"].split(":")[0];

//             // 当访问源的域和资源所在的域不是同一个域，做防盗链处理
//             if (referHost !== host) {
//                 let isInWhiteList = whiteList.includes(refer);
//                 p = isInWhiteList ? p : path.join(static, "error.png");
//             }
//         }

//         // 第一次访问请求页面 index.html，不存在 referer，将静态资源返回
//         // 第二次访问请求图片资源，如果 referer 和资源所本就是同一个域，直接将资源返回
//         fs.createReadStream(p).pipe(res);
//     } else {
//         res.statusCode = 404;
//         res.end("Not Found");
//     }
// }

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});


// module.exports = app