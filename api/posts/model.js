
const mongoose = require('mongoose');

const PostsScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    content: {
        type: String,
        min: 3
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    like: {
        type: Number,
        default: 0
    },
    disLike: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});
module.exports = mongoose.model('Posts', PostsScheme);