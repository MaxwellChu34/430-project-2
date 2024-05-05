const models = require('../models');

const { Quiz } = models;

const quizPage = async (req, res) => {
  res.render('quiz');
};

const updateQuiz = async (req, res) => {
  if (!req.body.answerName || !req.body.intSelected) {
    return res.status(400).json({ error: 'The question was not answered!' });
  }

  const question = `${req.body.question}`;
  const answerName = `${req.body.answer}`;
  const answerValue = `${req.body.intSelected}`;

  try {
    const query = { owner: req.session.account._id };
    const doc = await Quiz.findOne(query).lean().exec();
    if (doc) {
      const updatePromise = Quiz.findOneAndUpdate();
    }
    return res.status(404).json({ error: 'No quiz data found for user' });
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
