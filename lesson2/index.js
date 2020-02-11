const readline = require('readline');

const resource = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

resource.on('line', (cmd) => {
    if(cmd ==='exit'){
        resource.close();
    }
    if(cmd == randomInteger(1,2)){
        console.log('Мистер, да вы сама удача');
    } else {
        console.log('Попробуй ещё раз');
    };
    
})