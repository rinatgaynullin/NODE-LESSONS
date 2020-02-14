const http =require('http');
const parsed = require('./index.js')

http.createServer((req, res) => {

    const message = parsed
    res.write(message)
    res.end()
}).listen(4000)

