#!/usr/bin/env node
const prompt = require('prompt');
const fs = require('fs');
const {name, version} = require('../package.json');
const cards = require('./cards.json');

const session = auth();
const command = `
        Это пакет ${name} версии ${version}
        help -h                     -- Хелпер
        auth                        -- Авторизация
        list                        -- Получение списка карт
        get <id>                    -- Получение карты по id
        edit <id> <key> <value>     -- Получение карты по id
    `

if(process.argv.includes('help') || process.argv.includes('-h')) {
    console.log(command);
    return
}

if(process.argv.includes('auth')) {
    const properties = [
        {
            name: 'password',
            hidden: true
        }
    ];

    prompt.start();

    prompt.get(properties, function (err, result) {
        if (err) {return onErr(err);}
        if (result.password === '1234') {
            fs.writeFileSync('eSess', '');
        } else {
            return onErr('Не правиьный пароль!')
        }
    });

    function onErr(err) {
        console.log(err);
        return 1;
    }

}

if(process.argv.includes('list')) {
    if(!session) {
        console.log('Авторизуйтесь!');
        console.log(command);
    } else {
        console.table(cards);
    }

    return;
}

if(process.argv.includes('get')) {
    if(!session) {
        console.log('Авторизуйтесь!');
        console.log(command);
    } else {
        console.table(cards.filter(({id}) => id == process.argv[3]));
    }
    return;
}

if(process.argv.includes('edit')) {
    if(!session) {
        console.log('Авторизуйтесь!');
        console.log(command);
    } else {
        if(!process.argv[3] || !process.argv[4] || !process.argv[5]) {
            console.log(`ERROR!!! не указан парметр ${name} edit <id> <key> <value>`);
            return
        }
        const index = cards.findIndex(({id}) => id == process.argv[3]);
        if(index > 0) {
            cards[index][process.argv[4]] = process.argv[5];

            fs.writeFileSync('./bin/cards.json', JSON.stringify(cards));
            console.log('SUCCESS!!! карта обновлена');
        } else {
            console.log('ERROR!!! карта не найдена');
        }
    }
    return;
}

function auth() {
    let res = false;
    if (fs.existsSync('eSess')) {
        res = true;
    }

    return res;
}
