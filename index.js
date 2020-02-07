const ansi = require('ansi')
const cursor = ansi(process.stdout);
const colors = require('colors')

//Styled terminal outputs with ansi
cursor
.white()
.bg.green()
.write('hey body')
.reset()
.bg.reset()
.write('\n')

//Styled terminal outputs with color.js

console.log('console something when debug'.bold.red.underline)
console.log('another one something debug output'.bgCyan.bgBrightGreen.strikethrough)



console.log('hello world');