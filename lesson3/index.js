const request = require('request');
const cheerio = require('cheerio');


request('https://www.freecodecamp.org/' ,(err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body);

        const parsedResult = $('.logo-row')
        .find('h2')
        .text();
        console.log(parsedResult)
    }
})
module.exports = {}
