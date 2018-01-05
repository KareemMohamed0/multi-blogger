
const mongoose = require('mongoose');

const CommentsScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now

    },
    subComment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});
module.exports = mongoose.model('Comments', CommentsScheme);
