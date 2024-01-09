const express = require("express");
const router = express.Router();
const pool = require("../data/config");

router.get("/users", function (req, res) {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
router.get("/posts", function (req, res) {});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});
router.post("/users", (req, res, next) => {
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.email,
    (error, result) => {
      if (error) throw error;
      if (result.length == 0) return res.send(`Пользователь не найден`);
      req.session.role = result[0].role;
    }
  );
  pool.query("SELECT * FROM posts", (err, result) => {
    const role = req.session.role;
    if (err) throw err;
    console.log(result);
    return res.render(`posts`, { role: role, posts: result });
  });
});
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    } else {
      return res.redirect("/");
    }
  });
});
module.exports = router;
