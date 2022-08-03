const mongoose = require('mongoose');

const User = {
    email: {type: "String"},
    password: {type: "String"},
    type: {type: "String"},
    name: {type: "String"}
}

module.exports = mongoose.model('user', new mongoose.Schema(User));