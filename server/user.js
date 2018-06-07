var express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const utils = require('utility');

const visibleFilter = { pwd: 0, __v: 0 };
const cookieID = { userId: 'userId' }

Router.get("/info", (req, res) => {
    const { userId } = req.cookies;
    if (!userId) {
        res.json({ code: 1 });
    }
    User.findOne({ "_id": userId }, visibleFilter, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器错误！' });
        }
        if (doc) {
            res.json({ code: 0, data: doc });
        }
    });
});
Router.post("/register", (req, res) => {
    const { user, pwd, type } = req.body;
    User.findOne({ user: user }, function (err, doc) {
        if (doc) {
            res.json({ code: 1, msg: '用户名重复！' });
        } else {
            const userModel = new User({ user: user, pwd: md5pwd(pwd), type: type });
            userModel.save(function (err, small) {
                if (err) {
                    res.json({ code: 1, msg: 'server error!' });
                } else {
                    const { user, type, _id } = small;
                    res.cookie(cookieID.userId, _id);
                    console.log('注册成功！');
                    res.json({ code: 0, data: { user, type, _id } });
                }
            });
        }
    })
});
Router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5pwd(pwd) }, visibleFilter, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器错误！' });
        } else {
            if (doc) {
                res.cookie(cookieID.userId, doc._id);
                res.json({ code: 0, data: doc });
            } else {
                res.json({ code: 1, msg: '用户名和密码错误！' });
            }
        }
    });
});

Router.get('/list', function (req, res) {
    //User.remove({}, (err, doc) => { });
    User.find({}, function (err, doc) {
        return res.json(doc);
    });
});

Router.post('/update', function (req, res) {
    const userId = req.cookies.userId;
    if (!userId) {
        return res.json({ code: 1 });
    }
    User.findByIdAndUpdate(userId, req.body, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: err });
        }
        console.log(doc);
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, req.body);
        res.json({ code: 0, data });
    });
});

function md5pwd(pwd) {
    const salt = '12abesdjfHIWP#@!09@@1fdsfsd_afs)_90';
    return utils.md5(utils.md5(`${pwd}${salt}`));
}

module.exports = Router;



