function customDataCourses(courses) {
    return courses.map(course => {
        const date = new Date(course.created);
        return {
            title: course.title,
            desc: course.desc,
            content: course.content,
            lesson: course.lesson,
            author: course.author,
            id: course._id,
            date: date.toDateString()
        }
    });
}

function auth(req, res, next) {
    const id = req.cookies.user;
    if(id) {
        req.headers['X-Authorization'] = id;
    }
    next();
}

module.exports = {
    customDataCourses,
    auth
}

