const express = require('express');
const app = express();
const consolidate = require('consolidate');
const path = require('path');
const cheerio = require('cheerio');
const request = require('request');


const data = {
    news:[],
}; 


function getNews (count) {
    return new Promise ( ( resolve, reject) =>{
        request('https://tproger.ru/', (err, response, body) => {

            const data = {
                news:[],
            }; 

            if(!err && response.statusCode === 200){
                const $ = cheerio.load(body);
                $('.entry-content').each((index, element) => {
                    if (index < count){
                        data.news.push({
                            id: index,
                            text: $('.entry-content').eq(index).find('p').text()
                        }) 
                    }
                })
                console.log(data)
                resolve(data)
            } else {
                reject(error)
            }
        })
        
    } ) 
}



app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));
// Handlebars.registerHelper('newsCount' () {

// })

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/',  (req, res) => {
    res.render('news', {})
});

app.post('/news', async (req, res) => {
    let newsCount = req.body.param
    let data = await getNews(newsCount) 
    res.render('news', data);
});

app.listen(4000, () => {
    console.log('server up!!!');
});