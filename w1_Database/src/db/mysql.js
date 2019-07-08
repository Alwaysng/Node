var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port: 3306,
    database: 'login',
    multipleStatements: true
});

module.exports = sql=>{
    return new Promise((resolve,reject)=>{
        pool.query(sql, (error, data)=>{
            if(error){
                reject(error)
            }
            resolve(data);// 改变promise状态Resolved
        });
    })
}