const User = require('../Schema/User');

async function findUser(params = {}) {
    const result = await User.findOne(params);

    return result;
}

async function authUser(params) {
    const {email, password} = params;

    if(!email || !password) {
        return {ok: false, error: 'Поля не заполнены!'}
    }

    const user = await findUser({email: email.toLowerCase()});
    if(user) {
        const userPassword = atob(user.password).split(':')[1];

        if(password === userPassword) {
            return {ok: true, user}
        } else {
            return {ok: false, error: 'Не правильный Логин или Пароль'}
        }
    } else {
        return {ok: false, error: 'Не правильный Логин или Пароль'}
    }

}

async function regUser(params) {
    const {email, password, name} = params;
    const tryEmail = email.toLowerCase();

    const user = new User({email: tryEmail, password: btoa(tryEmail+':'+password), name, type: 'user'});
    const isMailBusy = await findUser({email: tryEmail});

    if(isMailBusy) {return {ok: false, error: 'Почта занята!'}}

    return new Promise(async (resolve) => {
        await user.save(function(err, user) {
            if(err) {
                console.log(err, 'ERROR regUser');
                resolve({ok: false, error: 'Что-то пошло не так! Перезагрузите страницу.'});
            } else {
                resolve({ok: true, user});
            }
        });
    });
}

module.exports = {
    regUser,
    findUser,
    authUser
}