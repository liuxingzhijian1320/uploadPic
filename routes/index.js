// const fs = require('fs');
// module.exports = (app) => {
//     fs.readdirSync(__dirname).forEach(file => {
//         if (file === 'index.js') { return; }
//         const route = require(`./${file}`);
//         app.use(route.routes()).use(route.allowedMethods());
//     });
// }


const uploadpic = require('./uploadpic')
const uploadtoken = require('./uploadtoken')

module.exports = (app) => {
    app.use(uploadpic.routes()).use(uploadpic.allowedMethods());
    app.use(uploadtoken.routes()).use(uploadtoken.allowedMethods());
}