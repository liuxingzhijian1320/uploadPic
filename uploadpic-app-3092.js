const Koa = require('koa')
const path = require('path')
const app = new Koa()
    // const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static'); // 静态文件
const koaBody = require('koa-body');

const routing = require('./routes'); // router路由
const { port } = require('./config')

// app.use(async function(ctx, next) {
//     let url = ctx.request['header'].host + ctx.request['url']
//     console.info(234, ctx.request, url)
//     return await next()
// })


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

module.exports = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});


// module.exports = app