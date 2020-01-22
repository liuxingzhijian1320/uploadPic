const Router = require('koa-router');
const router = new Router({ prefix: '/api/token' });

const {
    getToken,
} = require('../controllers/UploadToken')

// 获取
router.get('/', getToken);

module.exports = router;