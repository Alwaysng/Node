//设置默认值 status 成功返回1
function dataFormat({ status = 1, data = [], msg = 'success' } = {}) {
    //解构默认值,参数默认值

    if (status == 0) {
        msg = 'fail';
    }
    return {
        status,
        data,
        msg
    }
}

//添加后成功显示的状态
/* 
status:1
data
0
id:2
phone:1234
password:"123"
username:"杜兰特"
times:"2019-04-26T17:48:43.000Z"
msg:"success"
 */



/* 
添加后失败显示的状态
status:0
data
msg:"fail"
*/

exports.dataFormat = dataFormat;

