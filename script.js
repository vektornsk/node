const fs = require('fs');

const LIMIT = 1500000;

const stream = fs.createReadStream('file.txt');
let localBuff = [];
let listFile = [];
let prefixName = 1;

stream.on('data', (buff) => {

    const content = String(buff);
    const arr = content.split(' ').map(a => Number(a)).sort((a, b) => a - b);

    localBuff.push(...arr);

    const lengthBuff = localBuff.length;

    if(localBuff.length >= LIMIT) {
        for (let x = 0; x < Math.floor(lengthBuff / LIMIT) ; x++ ) {
            const name = 'chunk' + prefixName + '.txt'
            listFile.push(name);
            let chunk = localBuff.splice(0, LIMIT);
            const file = fs.createWriteStream(name);
            file.write(chunk.join(' '));
            file.end();
            prefixName++;
        }
    }
});

stream.on('end', () => {
   if (localBuff.length) {
       const name = 'chunk' + prefixName + '.txt'
       listFile.push(name);
       const file = fs.createWriteStream(name);
       file.write(localBuff.join(' '));
       file.end();
   }

   //TODO: Этап 2

});


