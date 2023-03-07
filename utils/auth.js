const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/authenticate');
    } else {
      next();
    }
};
  
module.exports = withAuth;