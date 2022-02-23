const express = require('express');
const House = require('../models/house');

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

    const tag_result = await House.findAll()

    const exTag = await House.findOne({where:{house_tag : house_tags}})
    console.log(exTag.dataValues.house_tag, "나오나??"); // 하나의 데이터의 경우에는 그냥 dataValues로 찾는다. (index안씀)
    const result = [];

    // for(const tmp of tag_result){
    //     tag_result.push({
    //         house_tag: tmp.house_tag
    //     })
    // }

    // console.log(result);
    console.log(tag_result);
    res.send(`The House Tag is  = ${tag_result[1].dataValues.house_tag} <br>    ${tag_result[0].dataValues.createdAt}`);

    /* DB에서 데이터가 이렇게 반환된다. 그래서 [0]으로 해야 House값을 가져온다. (이 데이터는 findAll로 찾았기 때문이다.)
    [
  House {
    dataValues: {
      id: 1,
      house_tag: 'House1',
      createdAt: null,
      updatedAt: null,
      deletedAt: null
    },
    _previousDataValues: {
      id: 1,
      house_tag: 'House1',
      createdAt: null,
      updatedAt: null,
      deletedAt: null
    },
    uniqno: 1,
    _changed: Set(0) {},
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [Array]
    },
    isNewRecord: false
  }
]
    */
    // res.send(`The House Tag is  = ${tag_result.house_tag}`);
});

module.exports = router;
