const fs = require('fs');

const FILE_SIZE = 100000000;

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

fs.open('file.txt', 'w', (err) => {
    if(err) throw err;

    while (true) {
        console.log(fs.statSync('file.txt').size);
        if (fs.statSync('file.txt').size >= FILE_SIZE) {
            console.log('File done');
            break;
        }

        fs.appendFileSync('file.txt', random(10, 1000000) + ' ');
    }
});
