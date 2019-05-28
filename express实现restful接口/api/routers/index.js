/* 
    这里包含所有数据的接口
*/

const express = require('express');

const Router = express.Router(); // express 的方法

const goodsRouter = require('./goods');

// const listRouter = require('./list');

// const regRouter = require('./reg');

// const loginRouter = require('./login');


Router.use(express.json(),express.urlencoded());

//商品
Router.use('/goods',goodsRouter);
//列表
// Router.use('/list',listRouter);
// //注册登陆
// Router.use('/reg',regRouter);

// Router.use('/login',goodsRouter);


module.exports = Router; //暴露出去