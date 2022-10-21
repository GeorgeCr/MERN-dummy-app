const isAuth = (req, res, next) => {
  console.log("from middleware...");

  // is auth
  if (req.session.isAuthenticated) {
    next();
    return;
  }
  res.status(403).send("You need to login first");
  return;
};

module.exports = {
  isAuth,
};
