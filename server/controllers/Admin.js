// This is from my portion of DomoMaker E

const models = require('../models');

const { Account } = models;

const adminPage = (req, res) => res.render('admin');

const users = async (req, res) => {
  try {
    const docs = await Account.find({}).lean().exec();
    return res.json(docs);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to find users' });
  }
};

module.exports = {
  adminPage,
  users,
};
