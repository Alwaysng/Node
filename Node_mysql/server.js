const express = require('express');
// console.log(express)

const app = express();

const {PORT} = require('./config.json');

const allRouter = require('./allRouter')


//将当前页面当作静态资源服务器
app.use(express.static('./'));

app.use(allRouter);

app.listen(PORT,()=>{
    console.log('success');
})