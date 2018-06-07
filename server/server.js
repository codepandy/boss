const express = require('express');
const user = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


var app = new express();

app.use(cookieParser());
app.use(bodyParser.json());


app.use('/user', user);
app.get("/data", function (req, res) {
    res.json({ user: 'wangpeng', age: 28 });
});

app.listen(9093, function () {
    console.log("the server is started on 9093.");
});

