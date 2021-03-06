const fs = require('fs');

class Utils {
    CallbackModel(ctx, status, message, data) {
        ctx.response.status = status;
        ctx.body = {
            code: status,
            message: message,
            data: data,
        };
    }

    timeFormat(date, type) {
        var time = new Date(date);

        var year = time.getFullYear()
        var month = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
        var day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()

        var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
        var minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
        var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
        if (type === "yyyy-mm-dd") {
            return [year, month, day].join("-")
        } else if (type === "mm-dd") {
            return [month, day].join("-")
        } else if (type === "MM-DD") {
            return `${month}月${day}日`
        } else if (type === "yyyy-mm-dd-HH-mm-ss") {
            return [year, month, day, hour, minute, second].join("-")
        } else {
            return [year, month, day].join("-") + " " + [hour, minute, second].join(":")
        }
    }

    /**
     * 设置白名单
     * @params url fetch的路径
     * @return Boolean
     * */
    judgeHttpUrl(url = '') {
        // console.info('judgeHttpUrl---123', url)
        if (!url) return false
        const urls = ['zhooson.cn', 'localhost:3092', 'hall.zhooson.cn']
        if (urls.indexOf(url) > -1) {
            return true
        } else {
            return false
        }
    }

    // 删除文件
    delFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(null)
                }
            })
        })
    }


}

module.exports = new Utils;