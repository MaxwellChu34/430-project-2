const models = require('../models');

const { Quiz } = models;

const quizPage = async (req, res) => {
  res.render('quiz');
};

const getQuiz = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select('q1 q2 q3 q4 q5').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving answers!' });
  }
};

module.exports = {
  quizPage,
  getQuiz,
};
