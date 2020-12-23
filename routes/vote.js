var express = require('express');
const { render } = require('pug');
var router = express.Router();
require('dotenv').config();


//localhost:3000/vote
router.get("/", function(req,res,next){

    var data = {
        factory : {
            address :'0x0000',
            count :3
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

module.exports = router;
