const express = require('express');

const Router = express.Router();

const { formatData } = require('../utils')

//结构 ../db/mongo 中封装的 添加 查询 方法
const { insert, find } = require('../db/mongo');


//添加
Router.post('/', async (req, res) => {
    // async & await 实现：用同步的代码实现异步操作
    // async * await 是ES7的知识
    //'user' 添加的  user
    let data = await insert('user', req.body);

    res.send(formatData({ data }))
})


//查询
/* 
http://localhost:1904/reg/check 带有check就进入这
 */
Router.get('/check', async (req, res) => {
    // async & await 实现：用同步的代码实现异步操作
    // async * await 是ES7的知识
    //查询用户名
    let { username } = req.query;
    let data = await find('user', { username });
    console.log('data--->:',data)
    if (data.length > 0) {
        return res.send(formatData({ code: 250 }))
    }
    //返回结果
    res.send(formatData({ data }))
})

module.exports = Router;