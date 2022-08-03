const mongoose = require('mongoose');

const Course = {
    "title": {
        "type": "String"
    },
    "desc": {
        "type": "String"
    },
    "content": {
        "type": "String"
    },
    "lesson": {
        "type": ["Mixed"]
    },
    "users": {
        "type": "String"
    },
    "author": {
        "type": "String"
    },
    "created": {
        "type": "String"
    },
    "updated": {
        "type": "String"
    }
}

module.exports = mongoose.model('course', new mongoose.Schema(Course));