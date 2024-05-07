const models = require('../models');

const { Quiz } = models;

const resultsPage = (req, res) => res.render('results');

const getResults = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select(
      'qDeterminant1 qDeterminant2 qDeterminant3 qDeterminant4 qDeterminant5',
    ).lean().exec();
    if (docs[0].qDeterminant1 === 0) {
      return res.json({ redirect: '/quiz' });
    } if (docs[0].qDeterminant2 === 0) {
      return res.json({ redirect: '/quiz' });
    } if (docs[0].qDeterminant3 === 0) {
      return res.json({ redirect: '/quiz' });
    } if (docs[0].qDeterminant4 === 0) {
      return res.json({ redirect: '/quiz' });
    } if (docs[0].qDeterminant5 === 0) {
      return res.json({ redirect: '/quiz' });
    }

    const array = [
      docs[0].qDeterminant1,
      docs[0].qDeterminant2,
      docs[0].qDeterminant3,
      docs[0].qDeterminant4,
      docs[0].qDeterminant5,
    ];
    const freqMap = {};
    array.forEach((num) => {
      freqMap[num] = (freqMap[num] || 0) + 1;
    });
    let maxFreq = 0;
    let modes = [];
    for (const num in freqMap) {
      const freq = freqMap[num];
      if (freq > maxFreq) {
        maxFreq = freq;
        modes = [parseInt(num)];
      } else if (freq === maxFreq) {
        modes.push(parseInt(num));
      }
    }
    if (modes.length > 1) {
      const mode = Math.floor(Math.random() * modes.length);
      return res.json({ result: mode });
    }
    return res.json({ result: modes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving determinants!' });
  }
};

module.exports = {
  resultsPage,
  getResults,
};
