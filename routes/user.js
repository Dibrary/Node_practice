const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log("User 이로 들오옴");
    res.send('Hello, User');
});

module.exports = router;



