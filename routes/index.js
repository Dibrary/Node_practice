const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    // res.render('index'); // 웹소켓 연습
    res.render('index2'); // socket.io 연습
});

module.exports = router;


