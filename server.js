const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {auth} = require('./helpers');

const PORT = 5500;

async function start() {
    const db = await mongoose.connect('mongodb://docker:mongopw@localhost:55000/MyCourses?authSource=admin');
    const app = express();

    app.use(cookieParser());
    app.use(auth);
    app.use(helmet());
    app.use(express.static('static'));
    app.use(express.urlencoded())
    app.use(express.json());
    app.use('/', router);


    app.listen(PORT, () => {console.log("Поехали!")});
}

start();



