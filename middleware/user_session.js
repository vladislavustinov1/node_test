const pool = require(`../data/config`);
module.exports = (req, res, next) => {
  if (!req.session.name) {
    return next();
  }
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    req.session.email,
    (err, data) => {
      if (err) return next(err);
      if (data) req.user = res.locals.user = data;
      next();
    }
  );
};
