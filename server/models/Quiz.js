const mongoose = require('mongoose');

let QuizModel = {};

const QuizSchema = new mongoose.Schema({
  qAnswer1: {
    type: String,
    required: true,
  },
  qAnswer2: {
    type: String,
    required: true,
  },
  qAnswer3: {
    type: String,
    required: true,
  },
  qAnswer4: {
    type: String,
    required: true,
  },
  qAnswer5: {
    type: String,
    required: true,
  },
  qDeterminant1: {
    type: Number,
    min: 1,
    required: true,
  },
  qDeterminant2: {
    type: Number,
    min: 1,
    required: true,
  },
  qDeterminant3: {
    type: Number,
    min: 1,
    required: true,
  },
  qDeterminant4: {
    type: Number,
    min: 1,
    required: true,
  },
  qDeterminant5: {
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
  qAnswer1: doc.qAnswer1,
  qAnswer2: doc.qAnswer2,
  qAnswer3: doc.qAnswer3,
  qAnswer4: doc.qAnswer4,
  qAnswer5: doc.qAnswer5,
  qDeterminant1: doc.qDeterminant1,
  qDeterminant2: doc.qDeterminant2,
  qDeterminant3: doc.qDeterminant3,
  qDeterminant4: doc.qDeterminant4,
  qDeterminant5: doc.qDeterminant5,
});

QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;
