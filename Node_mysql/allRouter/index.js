const express = require('express');

//中间键
const Router = express.Router();

const goodsRouter = require('./goods');

Router.use(express.json(),express.urlencoded({extended:false}));

Router.use('/goods',goodsRouter);


module.exports = Router;