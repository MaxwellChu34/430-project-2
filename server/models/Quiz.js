const mongoose = require('mongoose');

let QuizModel = {};

const QuizSchema = new mongoose.Schema({
  qAnswer1: {
    type: String,
    required: true,
    default: '',
  },
  qAnswer2: {
    type: String,
    required: true,
    default: '',
  },
  qAnswer3: {
    type: String,
    required: true,
    default: '',
  },
  qAnswer4: {
    type: String,
    required: true,
    default: '',
  },
  qAnswer5: {
    type: String,
    required: true,
    default: '',
  },
  qDeterminant1: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  qDeterminant2: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  qDeterminant3: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  qDeterminant4: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  qDeterminant5: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
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
