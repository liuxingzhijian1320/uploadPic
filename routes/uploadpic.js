const Router = require('koa-router');
const router = new Router({ prefix: '/api/pic' });
const auth = require('../middleware/auth')()

const {
    upload,
} = require('../controllers/UploadPic')

// 上传
router.post('/upload', auth, upload);

module.exports = router;