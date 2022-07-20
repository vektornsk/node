const express = require('express');
const path = require('path');

const app = express();
const superAdmin = [
    {
        login: '1',
        password: '1'
    }
];
const admins = [];


app.use((req, res, next) => {

    //TODO: проверить наличие хедера с авторизацией (Не работает)
    /*const token = false
    console.log(req.headers)

    if(!token && !req.originalUrl.match('\/auth')) {
       res.redirect('/auth');
    } else {
        next();
    }*/

    next();
});

app.get('/auth', (req, res) => {
    const {query, query: {login, password}} = req;

   if(login && password) {
       superAdmin.forEach(admin => {
           if(admin.login === login && admin.password === password) {
               res.set('WWW-Authenticate', 'Basic realm="example"')
               //res.redirect('/');
           }
       });
    }

    res.sendFile(path.join(__dirname, '/auth.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/create', (req, res, next) => {

    console.log(req.body) //TODO: не приходит
    let admin = {
        id: admins.length,
        login: 'test',
        password: 'test',
        created: new Date().toISOString()
    };

    admins.push(admin);

    res.send({ok: true, admins});

});

app.listen(3002);