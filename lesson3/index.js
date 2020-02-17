const request = require('request');
const cheerio = require('cheerio');
const http =require('http');

request('https://www.freecodecamp.org/' ,(err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body);

        const parsedResult = $('.logo-row')
        .find('h2')
        .text();
        http.createServer((req, res) => {
            const message = parsedResult
            res.writeHeader(200, {'Content-Type': 'application/json',});  
            res.write(message);  
            res.end();  
        }).listen(4000)
    }
})

