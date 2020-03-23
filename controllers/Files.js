const { CallbackModel } = require('../utils')
const glob = require('glob')

class Files {
    // 获取图片列表
    static async getlist(ctx) {
        try {
            const { bucket = 'test' } = ctx.request.query;
            // console.info('bucket', bucket)
            const files = glob.sync(`public/images/${bucket}/*`)
            const result = files.map(item => {
                return `${ctx.origin}${item.split('public')[1]}`
            })
            CallbackModel(ctx, 200, '获取文件成功', { files: result })
        } catch (error) {
            CallbackModel(ctx, 500, '获取文件失败', JSON.stringify(error))
        }
    }
}

module.exports = Files
