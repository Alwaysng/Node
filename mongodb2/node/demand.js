const {
    connect,
    find,
    // 以主键获取
    ObjectId
} = require('./mongo');
(async () => {
    const data = await find('user', {});
    console.log(data);
    const data1 = await find('user',{
        _id: ObjectId('5cec9ef333df62666be41eb5')
    })
    console.log(data1)
})();