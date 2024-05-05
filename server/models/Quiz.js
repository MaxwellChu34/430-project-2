const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  q1: {
    type: Number,
    min: 1,
    required: true,
  },
  q2: {
    type: Number,
    min: 1,
    required: true,
  },
  q3: {
    type: Number,
    min: 1,
    required: true,
  },
  q4: {
    type: Number,
    min: 1,
    required: true,
  },
  q5: {
    type: Number,
    min: 1,
    required: true,
  },
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
  q1: doc.q1,
  q2: doc.q1,
  q3: doc.q3,
  q4: doc.q4,
  q5: doc.q5,
});

const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;
