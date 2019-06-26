
const {
    connect,
    find,
    // 以主键获取
    ObjectId
} = require('./mongo');


//由于前面是一个异步 需要用async  await
(async () => {
    // const data = await find('students', {});
    const data2 = await find('students', {
        _id: ObjectId('5ce793644e4a27d8143af9ee')
    });
    // console.log(data);
    console.log(data2);
})();