var express = require('express');
var router = express.Router();

require('dotenv').config();


const Web3 = require('web3')
let web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_RPC_URL)
)


router.get('/getBlock', function(req, res, next) {
    //현재 블록체인 에서 생성된 블록의 정보를 조회하여 보여주는 기능.
    var block_num
    if( Number(req.query.block_num) ){
        block_num=Number(req.query.block_num);
    }
    else{
        block_num="latest"
    }
    web3.eth.getBlock(block_num, true, function(err,block)
    {
        console.log(block);

        datetime = block.timestamp*1000;
        block.time = new Date(datetime).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})
        block.txCount = block.transactions.length;
        //res.json(block);
        res.render('blockinfo',{block:block})
    })
});

module.exports = router;
