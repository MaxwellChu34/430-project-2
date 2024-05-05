const models = require('../models');

const { Quiz } = models;

const quizPage = async (req, res) => {
  res.render('quiz');
};

const updateQuiz = async (req, res) => {
  if (!req.body.answer || !req.body.answerIdNum) {
    return res.status(400).json({ error: 'The question was not answered!' });
  }

  try {
    const query = { owner: req.session.account._id };
    const doc = await Quiz.findOne(query).lean().exec();
    if (doc) {
      switch(req.body.question) { //Find out how to update multiple data entries at once
        case 1:
          const updatePromise = Quiz.findOneAndUpdate({}, {})
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
      }
    }
    const quizData = {
      qAnswer1: '',
      qAnswer2: '',
      qAnswer3: '',
      qAnswer4: '',
      qAnswer5: '',
      qDeterminant1: 0,
      qDeterminant2: 0,
      qDeterminant3: 0,
      qDeterminant4: 0,
      qDeterminant5: 0,
      owner: req.session.account._id,
    };
    try {
      const newQuiz = new Quiz(quizData);
      await newQuiz.save();
      return res.status(201).json({
        qAnswer1: newQuiz.qAnswer1,
        qAnswer2: newQuiz.qAnswer2,
        qAnswer3: newQuiz.qAnswer3,
        qAnswer4: newQuiz.qAnswer4,
        qAnswer5: newQuiz.qAnswer5,
        qDeterminant1: newQuiz.qDeterminant1,
        qDeterminant2: newQuiz.qDeterminant2,
        qDeterminant3: newQuiz.qDeterminant3,
        qDeterminant4: newQuiz.qDeterminant4,
        qDeterminant5: newQuiz.qDeterminant5,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occured making quiz data!' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong with contacting the database!' });
  }
};

const getAnswer1 = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select('qAnswer1').lean().exec();

    return res.json({ answer1: docs });
  } catch (err) {
    console.log(err);
    return res.status({ error: 'Error retreiving answers!' });
  }
};

const q1 = (req, res) => res.json({ redirect: '/q1' });

const q2 = (req, res) => res.json({ redirect: '/q2' });

const q3 = (req, res) => res.json({ redirect: '/q3' });

const q4 = (req, res) => res.json({ redirect: '/q4' });

const q5 = (req, res) => res.json({ redirect: '/q5' });

const results = (req, res) => res.json({ redirect: '/results' });

module.exports = {
  quizPage,
  updateQuiz,
  getAnswer1,
  q1,
  q2,
  q3,
  q4,
  q5,
  results,
};
