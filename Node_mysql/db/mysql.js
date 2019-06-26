const mysql = require('mysql');

const { database } = require('../config.json');



// const {dataFormat} = require('../tools');

//创建连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: database,
    multipleStatements: true
});


function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (error, rows) => {
            if (error) {
                return reject(error)
            }
            resolve(rows);
        })
    })
}

module.exports = query;