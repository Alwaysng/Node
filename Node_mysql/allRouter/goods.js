const express = require('express');

const Router = express.Router();

const mysql = require('mysql');

//增
Router.post('/',(req,res)=>{
    //req.body
})

//查
Router.get('/:id',(req,res)=>{
    //req.query,req.params
    //get请求参数放在req.query中 路径会放在req.params中
})

module.exports = Router;