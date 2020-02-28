const request = require('request')
const cheerio = require('cheerio')

module.exports = function getNews (count) {
    return new Promise ( ( resolve, reject) =>{
        request('https://tproger.ru/', (err, response, body) => {

            let news = []

            if(!err && response.statusCode === 200){
                const $ = cheerio.load(body);
                $('.entry-content').each((index, element) => {
                    if (index < count){
                        news.push( $('.entry-content').eq(index).find('p').text() ) 
                    }
                })
                
                resolve(news)
            } else {
                reject(error)
            }
        })
        
    } ) 
}