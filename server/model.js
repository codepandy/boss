// const mongoose = require('mongoose');

// const DB_URL = 'mongodb://101.200.55.167:27017/imooc';
// mongoose.connect(DB_URL);
// mongoose.connection.on('connected', function () {
//     console.log('mongo connect success.');
// })
// const user = mongoose.model('user', new mongoose.Schema({
//     name: { type: 'string', require: true },
//     age: { type: Number, require: true }
// }))

// user.create({ name: 'wangpeng', age: 30 }, function (err, doc1) {
//     console.log(doc1);
// });

const mongoose = require('mongoose');
const DB_URL = 'mongodb://101.200.55.167:27017/boss-chat'

mongoose.connect(DB_URL);;
mongoose.connection.on('connected', () => {
    console.log('mongo connect success.');
});

var models = {
    user: {
        'user': { 'type': String, 'require': true },
        'pwd': { 'type': String, 'require': true },
        'type': { 'type': String, 'require': true },
        //头像
        'avatar': { 'type': String },
        //个人简介或职位简介
        'desc': { 'type': String },
        //职位名
        'title': { 'type': String },
        //boss字段
        'company': { 'type': String },
        'money': { 'type': String }
    },
    chat: {}
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}





