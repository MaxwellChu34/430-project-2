const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

QuizSchema.statics.toAPI = (doc) => ({
});

const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;