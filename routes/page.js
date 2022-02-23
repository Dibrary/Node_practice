const express = require('express');
const House = require('../models/house_tb');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("페이지임");
    next(); // 이렇게 하면 아래 미들웨어로 넘어감.
}, (req, res, next) => {
    console.log("페이지임2");
    next();
}, (req, res, next) => {
    console.log("페이지임 3");
    //res.send("<h1>호호호</h1>"); // 하나의 연결된 미들웨어에서 중간에 res.send가 끼면 ERR_HTTP_HEADERS_SENT 에러 남.
    next();
});

router.get('/', (req,res) => {
    console.log("그냥 슬래쉬");
    res.send("Hello this is sample");
});

router.get('/this/:id', (req, res) => {
    console.log(req.params.id);
    res.send(`this is id number = ${req.params.id}`);
});


router.get('/house/:tag', async (req, res) => {
    const house_tags = req.params.tag;
    console.log(req.params.tag);

    // const tag_result = await House.findAll()

    House.findOne({where:{house_tag : house_tags}}).then((hs) => {
        console.log(hs.dataValues);
    });
    const result = [];

    // for(const tmp of tag_result){
    //     tag_result.push({
    //         house_tag: tmp.house_tag
    //     })
    // }

    // console.log(result);
    console.log(result.dataValues.house_tag);
    res.send(`The House Tag is  = ${result}`);
    // res.send(`The House Tag is  = ${tag_result.house_tag}`);
});



module.exports = router;
