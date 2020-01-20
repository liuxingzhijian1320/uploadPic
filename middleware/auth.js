const jwt = require('jsonwebtoken');
const util = require('util');
const { CallbackModel } = require('../utils')

const { secret } = require('../config');
const verify = util.promisify(jwt.verify);

module.exports = () => {
    return async(ctx, next) => {
        try {
            const { authorization = '' } = ctx.request.header;
            const token = authorization.split(' ')[1];
            if (!token) {
                CallbackModel(ctx, 404, '缺失Token信息', {})
                return;
            }
            try {
                // 解密payload，获取用户名和ID
                const payload = await verify(token, secret);
                ctx.state = {
                    user: {
                        ...payload
                    }
                };
                await next(); //运行完毕，交给下一个中间件
            } catch (err) {
                console.info(99999, err)
                if (JSON.stringify(err).search(/JsonWebTokenError/)) {
                    CallbackModel(ctx, 401, 'Token无效', JSON.stringify(err))
                } else {
                    CallbackModel(ctx, 500, '未知错误', JSON.stringify(err))
                }
            }
        } catch (err) {
            CallbackModel(ctx, 500, '错误', JSON.stringify(err))
        }
    }
}