//This is the Account for any page not related to this application

const notFound = (req, res) => {
  res.status(404).render('notFound', {
    page: req.url,
  });
};

module.exports = {
  notFound,
};
