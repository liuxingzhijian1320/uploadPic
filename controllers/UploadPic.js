const { CallbackModel } = require('../utils')

class UploadPic {
    // 获取七牛上传token
    static async upload(ctx) {
        try {
            // 上传单个文件
            const file = ctx.request.files.file; // 获取上传文件

            console.info(999, file)

            CallbackModel(ctx, 200, '上传成功！', { token: 123 })
        } catch (err) {
            CallbackModel(ctx, 500, '上传失败！', JSON.stringify(error))
        }
    }
}

module.exports = UploadPic