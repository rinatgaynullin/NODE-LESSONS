const express = require('express');
const app = express();
const consolidate = require('consolidate');
const path = require('path');
const cheerio = require('cheerio');
const request = require('request');


let data = {
    news:[],
    newsCount: 32,
}; 





request('https://tproger.ru/', (err, response, body) => {

    if(!err && response.statusCode === 200){
        const $ = cheerio.load(body);
        for(let i = 0;  i < $('.entry-content').find('p').length; i++ ){
            data.news.push( $('.entry-content').eq(i).find('p').text() )
        }
        
    }

    app.engine('hbs', consolidate.handlebars);
    app.set('view engine', 'hbs');
    app.set('views', path.resolve(__dirname, 'views'));
    // Handlebars.registerHelper('newsCount' () {

    // })

    app.use(express.json());

    app.use(express.urlencoded({extended: false}));

    app.get('/', (req, res) => {
        res.render('news', data)
    });

    app.post('/testform', (req, res) => {
        data.newsCount = req.body.param
        res.render('news', data);
    });

    app.listen(4000, () => {
        console.log('server up!!!');
    });
    
});


