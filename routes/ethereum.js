var express = require('express');
var router = express.Router();

require('dotenv').config();


const Web3 = require('web3')
let web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_RPC_URL)
)


router.get('/getBlock', function(req, res, next) {
    //현재 블록체인 에서 생성된 블록의 정보를 조회하여 보여주는 기능.
    var block_num = Number(req.query.block_num) | "latest";
    web3.eth.getBlock(block_num, true, function(err,block)
    {
        console.log(block);
        res.json(block);
    })
});

module.exports = router;
