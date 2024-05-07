// This is the controller for any page not related to this application

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  notFound,
};
