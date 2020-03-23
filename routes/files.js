const Router = require('koa-router');
const router = new Router({ prefix: '/api/files' });
const auth = require('../middleware/auth')()

const {
    // deletepic,
    getlist
} = require('../controllers/Files')

// 列表
router.get('/list', getlist);
// 删除
// router.post('/del', auth, deletepic);

module.exports = router;
