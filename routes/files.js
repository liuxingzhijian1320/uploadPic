const Router = require('koa-router');
const router = new Router({ prefix: '/api/files' });
const auth = require('../middleware/auth')()

const {
    delpic,
    getlist
} = require('../controllers/Files')

// 列表
router.get('/list', getlist);
// 删除
router.post('/delpic', auth, delpic);

module.exports = router;
