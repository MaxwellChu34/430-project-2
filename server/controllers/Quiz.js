const models = require('../models');

const { Quiz } = models;

// Renders the homepage of application quiz
const quizPage = async (req, res) => {
  res.render('quiz');
};

// Redirects each to their own question
const q1 = (req, res) => res.json({ redirect: '/q1' });

const q2 = (req, res) => res.json({ redirect: '/q2' });

const q3 = (req, res) => res.json({ redirect: '/q3' });

const q4 = (req, res) => res.json({ redirect: '/q4' });

const q5 = (req, res) => res.json({ redirect: '/q5' });

// updateQuiz updates the quiz received at signup
const updateQuiz = async (req, res) => {
  if (!req.body.answer || !req.body.answerIdNum) {
    return res.status(400).json({ error: 'The question was not answered!' });
  }

  const query = { owner: req.session.account._id };
  let updatePromise;
  //A switch case is put in place that depends on which question the user submits in
  switch (req.body.question) {
    case 1:
      updatePromise = Quiz.findOneAndUpdate(query, {
        qAnswer1: req.body.answer,
        qDeterminant1: req.body.answerIdNum,
      }).lean().exec();
      updatePromise.then((doc) => res.json({
        qAnswer1: doc.qAnswer1,
        qDeterminant1: doc.qDeterminant1,
      }));
      break;
    case 2:
      updatePromise = Quiz.findOneAndUpdate(query, {
        qAnswer2: req.body.answer,
        qDeterminant2: req.body.answerIdNum,
      }).lean().exec();
      updatePromise.then((doc) => res.json({
        qAnswer2: doc.qAnswer2,
        qDeterminant2: doc.qDeterminant2,
      }));
      break;
    case 3:
      updatePromise = Quiz.findOneAndUpdate(query, {
        qAnswer3: req.body.answer,
        qDeterminant3: req.body.answerIdNum,
      }).lean().exec();
      updatePromise.then((doc) => res.json({
        qAnswer3: doc.qAnswer3,
        qDeterminant3: doc.qDeterminant3,
      }));
      break;
    case 4:
      updatePromise = Quiz.findOneAndUpdate(query, {
        qAnswer4: req.body.answer,
        qDeterminant4: req.body.answerIdNum,
      }).lean().exec();
      updatePromise.then((doc) => res.json({
        qAnswer4: doc.qAnswer4,
        qDeterminant4: doc.qDeterminant4,
      }));
      break;
    case 5:
      updatePromise = Quiz.findOneAndUpdate(query, {
        qAnswer5: req.body.answer,
        qDeterminant5: req.body.answerIdNum,
      }).lean().exec();
      updatePromise.then((doc) => res.json({
        qAnswer5: doc.qAnswer5,
        qDeterminant5: doc.qDeterminant5,
      }));
      break;
    default:
      break;
  }
  updatePromise.catch((err) => {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  });
};

// Gets all Answer NAMES to display on the right side of screen
const getAnswer = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select('qAnswer1 qAnswer2 qAnswer3 qAnswer4 qAnswer5').lean().exec();
    return res.json({ answers: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving answers!' });
  }
};

// Gets all Answer ID's, checks if they have all been answered, then sends them to the result page
const results = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select(
      'qDeterminant1 qDeterminant2 qDeterminant3 qDeterminant4 qDeterminant5',
    ).lean().exec();
    if (docs[0].qDeterminant1 === 0) {
      return res.status(400).json({ error: 'Please answer Question 1 before submitting' });
    } if (docs[0].qDeterminant2 === 0) {
      return res.status(400).json({ error: 'Please answer Question 2 before submitting' });
    } if (docs[0].qDeterminant3 === 0) {
      return res.status(400).json({ error: 'Please answer Question 3 before submitting' });
    } if (docs[0].qDeterminant4 === 0) {
      return res.status(400).json({ error: 'Please answer Question 4 before submitting' });
    } if (docs[0].qDeterminant5 === 0) {
      return res.status(400).json({ error: 'Please answer Question 5 before submitting' });
    }
    return res.json({ redirect: '/result' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving determinants!' });
  }
};

module.exports = {
  quizPage,
  q1,
  q2,
  q3,
  q4,
  q5,
  updateQuiz,
  getAnswer,
  results,
};
