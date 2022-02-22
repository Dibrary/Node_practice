const express = require('express');

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

module.exports = router;
