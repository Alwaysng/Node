
const express = require('express');

const Router = express.Router(); // express 的方法


//删除 goods/ 这里的网址与index调用的地方是拼接的 相当与goods/goods/了


//增加商品
Router.post('/', (req, res) => {
    //操作数据库，并写入商品信息
    res.send({
        ...req.body,
    })
})


//删除商品  req保存的是？后面的的数据
Router.delete('/:id', (req, res) => { //动态路由
    //req.query保存的是？后的数据  req.body保存的是post的数据
    //操作数据库，并删除商品信息
    res.send({
        ...req.query,
        ...req.body,
        ...req.params, //动态路由保存在此
    })
})

//改商品信息 用 post id 改那个商品
Router.put('/:id', (req, res) => {
    res.end({
       ...req.body,
       ...req.params
    })
})


module.exports = Router;