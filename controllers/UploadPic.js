const { CallbackModel, timeFormat } = require("../utils");
const fs = require("fs");
const path = require("path");

// 递归创建目录 同步方法
function checkDirExist(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (checkDirExist(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

// 生成新的文件名称
function getUploadFileExt(name) {
    let ext = name.split(".");
    let first = name.replace(ext[ext.length - 1], "");
    let last = timeFormat(new Date(), "yyyy-mm-dd-HH-mm-ss");
    // return `${first.slice(0,10)}${last}.${ext[ext.length - 1]}`
    return `${last}.${ext[ext.length - 1]}`;
}

class UploadPic {
    // 获取七牛上传token
    static async upload(ctx) {
        try {
            // 上传单个文件
            const file = ctx.request.files.file; // 获取上传文件
            const { bucket = "test" } = ctx.request.body;
            // console.info('bucket', bucket)

            // 生成文件夹
            let dir = path.join(__dirname, `../public/images/${bucket}`);
            checkDirExist(dir);
            // console.info('dir', dir, file)

            // 生成图片文件名字
            let newName = getUploadFileExt(file.name);
            // console.info('newName', newName);

            // 文件目录
            let filePath = `${dir}/${newName}`;
            // console.info('filePath', filePath)

            // 创建可读流
            const reader = fs.createReadStream(file.path);

            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // console.info('upStream', upStream)

            // 可读流通过管道写入可写流
            reader.pipe(upStream);

            // ------ starting ------
            // 删除文件(可以注释这段代码，不明白为什么产生一些重复的文件)
            let delpath = path.join(__dirname, `../public/images`);
            let files = fs.readdirSync(delpath);
            // console.info(234, delpath, files)
            files.forEach((item) => {
                // 判断 是不是文件夹 【true: 文件夹】
                if (!fs.lstatSync(`${delpath}/${item}`).isDirectory()) {
                    if (item.indexOf("upload_") > -1) {
                        fs.unlink(`${delpath}/${item}`);
                    }
                }
            });
            // ------ ending ------

            let urlstr = `https://upload.zhooson.cn/images/${bucket}/${newName}`;
            CallbackModel(ctx, 200, "上传成功！", { url: urlstr });
        } catch (err) {
            console.info(33, err);
            CallbackModel(ctx, 500, "上传失败！", JSON.stringify(err));
        }
    }
}

module.exports = UploadPic;