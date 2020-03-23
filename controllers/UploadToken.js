const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { CallbackModel } = require('../utils')

class UploadToken {
    // 获取七牛上传token
    static async getToken(ctx) {
        try {
            const name = "zhooson";
            const token = jwt.sign({ name }, secret, { expiresIn: '1d' });
            CallbackModel(ctx, 200, '获取上传token成功！', { token })
        } catch (error) {
            CallbackModel(ctx, 500, '获取token失败！', JSON.stringify(error))
        }
    }
}

module.exports = UploadToken
