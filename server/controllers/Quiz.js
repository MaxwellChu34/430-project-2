const models = require('../models');

const { Quiz } = models;

const quizPage = async (req, res) => {
  res.render('quiz');
};

const q1 = (req, res) => res.json({ redirect: '/q1' });

const q2 = (req, res) => res.json({ redirect: '/q2' });

const q3 = (req, res) => res.json({ redirect: '/q3' });

const q4 = (req, res) => res.json({ redirect: '/q4' });

const q5 = (req, res) => res.json({ redirect: '/q5' });

const results = (req, res) => res.json({ redirect: '/results' });

const updateQuiz = async (req, res) => {
  if (!req.body.answer || !req.body.answerIdNum) {
    return res.status(400).json({ error: 'The question was not answered!' });
  }

  try {
    const query = { owner: req.session.account._id };
    console.log(req);
    const doc = await Quiz.findOne(query).lean().exec();
    if (!doc) {
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
          qDeterminant1: newQuiz.qAnswer1,
          qDeterminant1: newQuiz.qAnswer2,
          qDeterminant1: newQuiz.qAnswer3,
          qDeterminant1: newQuiz.qAnswer4,
          qDeterminant1: newQuiz.qAnswer5
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occured making quiz data!' });
      }
    }
    let updatePromise;
    switch (req.body.question) {
      case 1:
        updatePromise = Quiz.findOneAndUpdate({}, {
          qAnswer1: req.body.answer,
          qDeterminant1: req.body.answerIdNum,
        }).lean().exec();
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      default:
        break;
    }
    updatePromise.catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
    });
    req.session.account = Quiz.toAPI(updatePromise);
    switch (req.body.question) {
      case 1:
        return res.json({ redirect: '/q1' });
      case 2:
        return res.json({ redirect: '/q2' });
      case 3:
        return res.json({ redirect: '/q3' });
      case 4:
        return res.json({ redirect: '/q4' });
      case 5:
        return res.json({ redirect: '/q5' });
      default:
        break;
    }
    return res.status(500).json({ error: 'Something went wrong' });
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
    return res.status({ error: 'Error retrieving answers!' });
  }
};

module.exports = {
  quizPage,
  q1,
  q2,
  q3,
  q4,
  q5,
  results,
  updateQuiz,
  getAnswer1,
};
