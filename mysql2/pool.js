var mysql = require('mysql');
var config = require('./config');
var pool = mysql.createPool({
    // 连线限制数 取决于硬件
    connectionLimit: 10,
    // 结构
    ...config
    //结构const config = {
    //     host            : 'localhost',
    //     user            : 'root',
    //     password        : 'root',
    //     database        : 'mysqldb'
    // }
    //=====>{
    //     host            : 'localhost',
    //     user            : 'root',
    //     password        : 'root',
    //     database        : 'mysqldb'
    // }
});

//执行sql语句  


/* 查询的第一种方式 */

// pool.query('SELECT * FROM user', function (error, results, fields) {

/* 查询的第二种方式 */

  pool.query('SELECT * FROM user where ?',[{
    id:3
  }], function (error, results, fields) {
    if (error) throw error;
    console.log('所有数据: ', results);
    // console.log('第一条数据: ', results[0]);
    // console.log('第一条数据的名字: ', results[0].name);
  });


  /* 此方法没了连接池和关闭,从而提升了数据库的操作速度 推荐使用这种方法*/