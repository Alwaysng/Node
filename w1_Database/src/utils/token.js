//引入模块

const jwt = require('jsonwebtoken');

const {miyao} = require('../config.json')

// 生成token（加密）
exports.create = (data,expiresIn=60*60*2)=>{
    // data:加密的数据
    // expiresIn: token有效期
    // 签名：加密
    let token = jwt.sign({data}, miyao, {
        expiresIn
    });

    return token
}


// 校验token（解密）
exports.verify = (token)=>{
    let res = false;
    try{
        jwt.verify(token, miyao);//得出解密后的结果Object:{data:xxx...}
        res = true
    }catch(err){
        res = false;
    }

    return res;
}