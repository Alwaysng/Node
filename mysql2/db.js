const mysql = require('mysql')
const config = require('./config');
console.log(mysql);
console.log(config);

//创建连接
let connection = mysql.createConnection(config);
  
//执行连接
connection.connect();

//执行sql语句
connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error;
    console.log('所有数据: ', results);
    console.log('第一条数据: ', results[0]);
    console.log('第一条数据的名字: ', results[0].name);
  });
   
  connection.end();

  //此数据库比较低效