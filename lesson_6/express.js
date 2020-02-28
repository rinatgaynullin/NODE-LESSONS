const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Метод для загрузки новостей
const getNews = require('./news.service');
//Connect
mongoose.connect('mongodb://localhost:32768/news', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const newsMongoose = require('./models/news');
const userMongoose = require('./models/user');
const passport = require('./passport');

const app = express();

//Для шаблонизатора
const consolidate = require('consolidate');
const path = require('path');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

//For JSON
app.use(express.json());
//For forms - POST
app.use(express.urlencoded({extended: false}));

//Сессии и авторизация
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'gsdfhsdafgasdfhdsffdsa',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));


app.use(passport.initialize);
app.use(passport.session);

//Secure
app.use('/news', passport.mustAuth);

app.get('/news', async (req, res) => {
    const {_id} = req.user;
    let news = await newsMongoose.find({user: _id});
    news = JSON.parse(JSON.stringify(news));
    let text = news[0]
    console.log(text)
    res.render('user', text);
})

app.post('/news', async(req, res) => {
    const {_id} = req.user;
    const count = req.body.count;
    await newsMongoose.deleteMany({user: _id});
    const newNews = await getNews(count);
    const news = new newsMongoose( {text: newNews, user: _id} );
    await news.save();
    res.redirect('/news')
});


app.get('/registration', (req, res) => {
    res.render('register');
});

app.post('/registration', async (req, res) => {
    const {repassword, ...restBody} = req.body;
    if(restBody.password === repassword){
        const user = new userMongoose(restBody);
        await user.save();
        res.redirect('/auth');
    } else {
        res.redirect('/auth?err=err1');
    }
    
});

app.get('/auth', (req, res) => {
    const {error} = req.query;
    res.render('auth', {error});
});

//TODO
app.post('/auth', passport.autenticate);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
});

app.listen(4000, () => {
    console.log('Server works!');
});