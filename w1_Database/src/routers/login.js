const express = require('express');

const Router = express.Router();

const { mongo: { find } } = require('../db');

const { formatData,token } = require('../utils')

Router.get('/', async (req, res) => {
    let { username, password } = req.query;
    console.log(username, password);

    let result = await find('user', { username, password });
    // console.log('result:',result)
    //查询完有数据   返回密码是否正确
    if (result.length > 0) {
        // res.send(formatData());

        // 生成token，并返回客户端
        let Athorization = token.create(username);
        // res.set('Athorization', Athorization);
        res.send(formatData({ data: Athorization }))

    } else {
        res.send(formatData({ code: 250, msg: 'login fail(登录失败)' }))
    }

    console.log('result:', result)
    // res.send(result)
})


module.exports = Router;