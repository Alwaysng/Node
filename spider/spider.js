const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const fs = require('fs');
// console.log(express);
// console.log(request);
// console.log(cheerio);

const app = express();

//get 和 use 的区别是不管是什么请求都会进use 而 get 只 get 请求才会进入
app.get('/epet', (req, res) => {
    let arr = [];
    //此处只发送get请求进入 不需 next 
    request('http://list.jiuxian.com/search.htm?v=2&key=%E6%8B%89%E8%8F%B2&isOwn=1&area=6', function (error, response, body) {

        const $ = cheerio.load(body);

        $('li', '.proListSearch').each((idx, cli) => {
            let imgurl = $(cli).find('img').attr('src');
            let filename = path.basename(imgurl);
            let goods = {
                //获取商品的id
                productId:$(cli).attr('product-box'),
                //商品简介
                name:$(cli).find('.proName a').attr('title'),
                //图片地址
                imgurl:filename,
                //评价
                judge:$(cli).find('.judgeAdv span').text()
            }

            arr.push(goods);
            console.log(arr);

            // console.log(filename);
            //将图片写入到img文件夹下
            request(imgurl).pipe(fs.WriteStream('./img/' + filename))
        })

        // res.send(arr);

        let productId = arr.map(item=>item.productId).join();
        console.log('------id',productId)

        request.get('http://list.jiuxian.com/act/selectPriceAndClubPriceByProIds.htm?ids='+productId,(error,response,body)=>{
            // console.log(1234567);
            let prices = JSON.parse(body).data;
            console.log('数据----->:',prices)
            arr = arr.map(item=>{
                for(let i = 0 ; i < prices.length; i++){
                    if(item.productId == prices[i].productId){
                        //添加价格
                        Object.assign(item,prices[i]);
                        break;
                    }
                }
                return item;
            })
            res.send(arr);
        });
    });

})


app.listen(1902, () => {
    console.log('success');
})