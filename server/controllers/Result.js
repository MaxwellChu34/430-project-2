const models = require('../models');

const { Quiz } = models;

const resultsPage = (req, res) => res.render('results');

module.exports = {
  resultsPage,
};
