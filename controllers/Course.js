const servicesCourse = require('../services/courses');
const servicesUser = require('../services/users');

async function getCreate(req, res) {
    const auth = req.headers['X-Authorization'];
    if(auth) {
        res.render('index.pug', {route: 'create'});
    } else {
        res.redirect('/auth');
    }
}

async function postCreate(req, res) {
    const id = req.headers['X-Authorization']
    const user = await servicesUser.findUser({_id: id});
    const usersEmail = req.body.users.trim();
    const data = {
        ...req.body,
        author: user.name,
        users: usersEmail? user.email+','+usersEmail : user.email
    }
    const result = await servicesCourse.create(data);

    if(result.ok) {
        res.render('index.pug', {route: 'create', success: `Курс ${result.course.title} успешно создан!`});
    } else {
        res.render('index.pug', {route: 'create', error: result.error});
    }
}

async function getUpdate(req, res) {
    const {id: courseId} = req.params;
    const id = req.headers['X-Authorization'];
    const result = await servicesCourse.findCourse(courseId);
    if(id) {
        if(result.ok) {
            const user = await servicesUser.findUser({_id: id});
            console.log(result.course)
            if(user) {
                result.course.users.split(',').forEach(u => {
                    if(u === user.email) {
                        res.render('index.pug', {route: 'update', course: result.course});
                    }
                });
            }
            res.render('index.pug', {route: 'update', error: 'Нет доступа!'});
        } else  {
            res.render('index.pug', {route: 'update', error: result.error});
        }
    } else {
        res.redirect('/auth');
    }

}

async function putUpdate(req, res) {
    const {id: courseId} = req.params;
    const {title, desc, content, users, ...lesson} = req.body;

    const data = {
        title,
        desc,
        content,
        lesson: Object.values(lesson),
        users: users
    }
    const result = await servicesCourse.update(courseId, data);
    if(result.ok) {
        res.render('index.pug', {route: 'update', course: result.course, success: 'Успешно обновлено!'});
    } else  {
        res.render('index.pug', {route: 'update', error: result.error});
    }
}

async function getCourses(req, res) {
    const courses = await servicesCourse.findAllCourse();
    res.render('index.pug', {route: 'courses', courses});
}

async function getCourse(req, res) {
    const {id: idCourse} = req.params;
    const result = await servicesCourse.findCourse(idCourse);
    const id = req.headers['X-Authorization'];
    const user = await servicesUser.findUser({_id: id});

    if(result.ok) {
        const users = result.course.users.split(',');
        let viewing = false;
        if(user) {
            users.forEach((u) => {
                if(u === user.email) {
                    viewing = true
                }
            });
        }

        res.render('index.pug', {route: 'course', course: result.course, viewing});
    } else {
        res.render('index.pug', {route: 'course', error: result.error});
    }
}

module.exports = {
    getCreate,
    postCreate,
    getUpdate,
    putUpdate,
    getCourses,
    getCourse
}