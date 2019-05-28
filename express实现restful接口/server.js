const express = require('express');

const app = express();

const allRouters = require('./api/routers')

//配置静态资源服务器 根目录
app.use(express.static('./'));
console.log(12324);


app.use(allRouters)


app.listen(1902, () => {
    console.log('server is running on http://locahost:1902');
});