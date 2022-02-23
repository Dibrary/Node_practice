const express = require('express'); // 익스프레스 모듈 불러오기
const cookieParser = require('cookie-parser'); // 쿠키관련 처리를 위해 
const morgan = require('morgan'); // 로그 남겨주기
const path = require('path'); // 경로관련
const session = require('express-session');
const nunjucks = require('nunjucks'); // html 템플릿
const dotenv = require('dotenv'); // env파일 설정
const {sequelize} = require('./models');

dotenv.config();

const pageRouter = require('./routes/page');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
    watch:true,
});


sequelize.sync({force:false}).then(() => {
    console.log("데이터베이스 연결 성공");
}).catch((err) => {
    console.error(err);
});


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

// app.use('/', pageRouter);
app.use('/', pageRouter);

app.get('/', (req, res, next) => {
    console.log('GET 요청에서만 실행됩니다.');
});

// app.use((req, res, next) => {
//     const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//     error.status = 404;
//     next(error);
// });

// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production'? err:{};
//     res.status(err.status || 500);
//     res.render('error');
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});








