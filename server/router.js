const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/change', mid.requiresSecure, mid.requiresLogout, controllers.Account.change);
  app.post('/admin', mid.requiresSecure, mid.requiresLogout, controllers.Account.admin);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/quiz', mid.requiresLogin, controllers.Quiz.quizPage);
  app.get('/q1', mid.requiresLogin, controllers.Quiz.q1);
  app.get('/q2', mid.requiresLogin, controllers.Quiz.q2);
  app.get('/q3', mid.requiresLogin, controllers.Quiz.q3);
  app.get('/q4', mid.requiresLogin, controllers.Quiz.q4);
  app.get('/q5', mid.requiresLogin, controllers.Quiz.q5);
  app.get('/results', mid.requiresLogin, controllers.Quiz.results);

  app.post('/q1', mid.requiresLogin, controllers.Quiz.updateQuiz);
  app.post('/q2', mid.requiresLogin, controllers.Quiz.updateQuiz);
  app.post('/q3', mid.requiresLogin, controllers.Quiz.updateQuiz);
  app.post('/q4', mid.requiresLogin, controllers.Quiz.updateQuiz);
  app.post('/q5', mid.requiresLogin, controllers.Quiz.updateQuiz);

  app.get('/getAnswer1', mid.requiresLogin, controllers.Quiz.getAnswer1);

  app.get('/adminPage', controllers.Admin.adminPage);
  app.get('/users', controllers.Admin.users);
  app.get('/logoutAdmin', controllers.Account.logout);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', controllers.NotFound.notFound);
};

module.exports = router;
