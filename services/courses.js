const Course = require('../Schema/Course');
const {customDataCourses} = require('../helpers');

async function findCourse(id) {
    try {
        const course = await Course.findOne({_id: id});
        if(course) {
            return {ok: true, course}
        } else {
            return {ok: false, error: 'Не найдено!'}
        }
    } catch (err) {
        return {ok: false, error: 'Не найдено!'}
    }
}

async function findAllCourse(limit) {
    const courses = await Course.find();
    const result = customDataCourses(courses);

    return result;
}

function create(params) {
    const {title, desc, content, author, users, ...lesson} =  params;
    const course = new Course({
        title,
        desc,
        content,
        lesson: Object.values(lesson),
        author,
        users,
        created: new Date().toISOString()
    });

    return new Promise(async (resolve) => {
        await course.save(function(err, course) {
            if(err) {
                console.log(err, 'ERROR create');
                resolve({ok: false, error: 'Что-то пошло не так! Перезагрузите страницу.'});
            } else {
                console.log(course)
                resolve({ok: true, course});
            }
        });
    });
}

async function update(id, params) {
    const postData = {
        ...params,
        updated: new Date().toISOString()
    }
    await Course.updateOne({ _id: id }, postData);

    return {ok: true, course: postData};
}


module.exports = {
    create,
    findAllCourse,
    findCourse,
    update
}