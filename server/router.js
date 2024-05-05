const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/change', mid.requiresSecure, mid.requiresLogout, controllers.Account.change);
  app.post('/admin', mid.requiresSecure, mid.requiresLogout, controllers.Account.admin);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/quiz', mid.requiresLogin, controllers.Quiz.makeQuiz);

  app.get('/adminPage', controllers.Admin.adminPage);
  app.get('/users', controllers.Admin.users);
  app.get('/logoutAdmin', controllers.Account.logout);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', controllers.NotFound.notFound);
};

module.exports = router;
