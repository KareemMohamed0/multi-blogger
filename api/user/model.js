const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://static1.squarespace.com/static/557d1981e4b097936a86b629/t/558cf487e4b05d368538793a/1435301000191/'
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    }]

});
module.exports = mongoose.model('User', UserScheme);
