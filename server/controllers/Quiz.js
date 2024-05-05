const models = require('../models');

const { Quiz } = models;

const quizPage = async (req, res) => {
  res.render('quiz');
};

const updateQuiz = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select('q1 q2 q3 q4 q5').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving answers!' });
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
  q1,
  q2,
  q3,
  q4,
  q5,
  results,
};
