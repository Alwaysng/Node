const {
    MongoClient,
    ObjectId //用主建查询,暴露出去让text可以使用
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = '1902';
// Use connect method to connect to the server
// 异步 回调金字塔，回调地狱

// 执行连接
const connect = (col) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            const collection = db.collection(col);
            if (err) {
                reject(err)
            } else {
                resolve({
                    collection,
                    //应该要查询完后才关闭连接,所以需要把client传出去
                    client
                });
            }
            //关闭连接
            // console.log(client.close())
        });
    })
}


//params{} 查询条件 col连接的数据库 
const find = (col, params) => {
    //由于Promise 是一个异步 需要先连接connect 才执行后面的操作
    return new Promise(async (resolve, reject) => {
        // const collection = await connect(col);
        const {
            //拿connect传过来的数据
            collection,
            client
        } = await connect(col) //相当于调用 connect(col) 方法
        // Find some documents
        collection.find({
            ...params
        }).toArray(function (err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        });
        // 关闭
        client.close();
    })
}

// 将其暴露出去
module.exports = {
    connect,
    find,
    ObjectId
}