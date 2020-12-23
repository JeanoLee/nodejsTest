var express = require('express');
const { render } = require('pug');
var router = express.Router();
require('dotenv').config();

let fs = require('fs');


const Web3 = require('web3')
let web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.INFURA_RPC_URL)
)


//localhost:3000/vote
router.get("/", function(req,res,next){
    
    var voteFactoryAbi = JSON.parse( fs.readFileSync('abis/voteFactory.abi.json') )
    var voteFactoryContract = new web3.eth.Contract(voteFactoryAbi, process.env.CONTRACT_ADDR_VOTE)

    voteFactoryContract.methods.countOfVote().call()
    // call() : 상수함수들 view/pure, public으로 지정된 상태변수
    // send() : 그 외의 함수들(상태변수를 변경하는 함수들) 
    //        : 트랜잰션을 만들어서 전송함. ** Private Key가 필요

    .then( function(result){

        var data = {
            factory : {
                address :process.env.CONTRACT_ADDR_VOTE,
                count :result
            },
            votelist : [
                { title:'테스트123'},
                { title:'테스트234'},
                { title:'테스트345'},
                { title:'테스트456'},
                { title:'테스트567'}
            ]
        }
    
        res.render('voteDashboard',{data:data});

    })

    
})

module.exports = router;
