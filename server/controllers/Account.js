//A majority of this is from DomoMaker

const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/quiz' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/quiz' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

//change is responsible for authenticating the user and then changing the password
const change = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass === pass2) {
    return res.status(400).json({ error: 'Passwords need to be different!' });
  }

  const hash = await Account.generateHash(pass2);

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }
    const updatePromise = Account.findOneAndUpdate(
      { username: req.body.username },
      { password: hash },
      { returnDocument: 'after', sort: { createdDate: 'descending' } },
    ).lean().exec();
    updatePromise.catch((err2) => {
      console.log(err2);
      return res.status(500).json({ error: 'Something went wrong!' });
    });
    req.session.account = Account.toAPI(updatePromise);
    return res.json({ redirect: '/quiz' });
  });
};

//admin checks if username is ADMIN and if password is PASSWORD
const admin = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (username !== 'ADMIN') {
    return res.status(401).json({ error: 'That is the wrong admin username!' });
  }

  if (pass !== 'PASSWORD') {
    return res.status(401).json({ error: 'That is not the admin password!' });
  }

  return res.json({ redirect: '/adminPage' });
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  change,
  admin,
};
