const { CallbackModel, delFile } = require('../utils')
const glob = require('glob');
const fs = require('fs');

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

    // 删除图片
    static async delpic(ctx) {
        // console.info(9999, ctx)
        try {
            // pid ==> 1.jpg
            console.info('ctx.request.body', JSON.stringify(ctx.request.body))


            const { bucket = 'test', pid } = ctx.request.body;

            // 找到当前文件
            let curPath = `public/images/${bucket}/${pid}`;
            // 先判断当前文件是否存在
            if (fs.existsSync(curPath) && pid) {
                const err = await delFile(curPath)
                if (!err) {
                    CallbackModel(ctx, 200, '删除成功', {})
                } else {
                    CallbackModel(ctx, 500, '删除失败', {})
                }
            } else {
                CallbackModel(ctx, 404, '当前图片不存在', {})
            }
        } catch (error) {
            console.info(888, error)
            CallbackModel(ctx, 500, '删除文件失败', JSON.stringify(error))
        }
    }
}

module.exports = Files
