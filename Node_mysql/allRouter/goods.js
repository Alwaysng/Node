const express = require('express');

const Router = express.Router();

const query = require('../db/mysql');

// const {database} = require('../config.json');

const { dataFormat } = require('../tools');

// //创建连接池
// var pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     port: 3306,
//     database:database,
//     multipleStatements: true
// });


//增
Router.post('/', (req, res) => {

    console.log('req.body------>:', req.body);
    /* 
        req.body------>: [Object: null prototype] {
        id: '11',
        phone: '1245460000',
        password: 'qwert',
        username: 'olo' }
    */

    //req.body
    let str = '';
    let item = '';
    for (let key in req.body) {
        //从body中拿出需要添加的数据,并且添加个,
        console.log('key------>:', key);
        /* 
         key------>: id
         key------>: phone
         key------>: password
         key------>: username
        */
        item += key + ',';

        //添加结果有些是string类型的需要添加“”;
        str += '"' + req.body[key] + '"' + ',';
    }

    item = item.slice(0, -1);
    console.log('item:', item);


    str = str.slice(0, -1);
    console.log('str:', str);

    query(`INSERT INTO userinfo(${item}) VALUES(${str})`).then((data) => {
        //当data有数据时 dataFormat()设置有默认值 返回 status = 1, data = [], msg = 'success'
        if (data) {
            res.send(dataFormat());
        } else {
            res.send(dataFormat({
                status: 0
            }))
        }
    })
})

// //查
// Router.get('/:id', (req, res) => {
//     //req.query,req.params
//     //get请求参数放在req.query中 路径会放在req.params中
//     let { id } = req.params;
//     // pool.query('SELECT * FROM userinfo WHERE id='+ id,(error,rows)=>{
//     //     res.send(dataFormat({data:rows}));
//     // })
//     query('SELECT * FROM userinfo WHERE id=' + id).then((data) => {
//         console.log('data---->:', data)
//         res.send(dataFormat({ data }))
//     })

// })


// //删
// Router.delete('/:id', (req, res) => {
//     //req.query,req.params
//     //get请求参数放在req.query中 路径会放在req.params中
//     let { id } = req.params;
//     // pool.query('SELECT * FROM userinfo WHERE id='+ id,(error,rows)=>{
//     //     res.send(dataFormat({data:rows}));
//     // })
//     query(`delete from userinfo where id=${id}`).then((data) => {
//         if (data) {
//             res.send(dataFormat());
//         } else {
//             res.send(dataFormat({
//                 status: 0
//             }))
//         }
//     })

// })

// //改
// Router.put('/:id', (req, res) => {
//     let { id } = req.params;
//     let keyvalue = '';//name=xxx,price=xx
//     for (let key in req.body) {
//         keyvalue += key + '="' + req.body[key] + '",'
//     }
//     keyvalue = keyvalue.slice(0, -1);
//     query(`update userinfo set ${keyvalue} where id=${id}`).then(data => {
//         res.send(dataFormat({ status: data ? 1 : 0 }))
//     })
// })





//链式操作
Router.route('/:id')
    .get(async (req, res) => {
        // req.query,req.params
        // ES7:
        // await ： 等待promise对象的返回结果
        // await 必须放在async函数中
        // async 函数返回一个promise对象 

        let { id } = req.params;

        // query('SELECT * FROM userinfo WHERE id=' + id).then((data) => {
        //         console.log('data---->:', data)
        //         res.send(dataFormat({ data }))
        //     })


        // 使用async异步  await等待(用同步的方法执行异步的操作)  等待异步操作执行完就执行 await方法 就可以不执行 then((data) => ...方法
        let data = await query(`select * from userinfo where id=${id}`)
        res.send(dataFormat({ data }))
    })

    .delete((req, res) => {
        let { id } = req.params;
        query(`delete from userinfo where id=${id}`).then(data => {
            res.send(dataFormat({ status: data ? 1 : 0 }))
        })
    })

    .put((req, res) => {
        //http://localhost:1904/goods/3
        //body->x-www-form-urlencoded key:username value:老王
        let { id } = req.params;
        let keyvalue = '';//name=xxx,price=xx
        for (let key in req.body) {
            keyvalue += key + '="' + req.body[key] + '",'
        }
        keyvalue = keyvalue.slice(0, -1);
        query(`update userinfo set ${keyvalue} where id=${id}`).then(data => {
            res.send(dataFormat({ status: data ? 1 : 0 }))
        })
    })


module.exports = Router;