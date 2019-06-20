const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer((req,res)=>{
    let pathname = url.parse(req.url).pathname;

    //获取绝对路径
    let realpath = path.join(_dirname,pathname);
})