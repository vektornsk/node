const servicesUser = require('../services/users');
const servicesCourse = require('../services/courses');

async function getMain(req, res) {
    //TODO: выбрать 5 последних
    const courses = await servicesCourse.findAllCourse() || [];
    const auth = req.headers['X-Authorization'];

    res.render('index.pug', {route: 'main', auth: !!auth, courses});
}

function getAuth(req, res) {
    res.render('index.pug', {route: 'auth'});
}

async function postAuth(req, res) {
    const result = await servicesUser.authUser(req.body);
    if(result.ok) {
        const courses = await servicesCourse.findAllCourse() || [];

        res.cookie('user', result.user._id);
        res.render('index.pug', {route: 'main', auth: true, courses});
    } else {
        res.render('index.pug', {route: 'auth', error: result.error});
    }
}

function getReg(req, res) {
    res.render('index.pug', {route: 'reg'});
}

async function postReg(req, res) {
    const result = await servicesUser.regUser(req.body);
    if(result.ok) {
        res.render('index.pug', {route: 'reg', success: `Пользователь ${result.user.name} успешно зарегестрирован!`});
    } else {
        res.render('index.pug', {route: 'reg', error: result.error});
    }
}


module.exports = {
    getMain,
    getReg,
    getAuth,
    postReg,
    postAuth
}