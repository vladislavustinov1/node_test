const express = require("express");
const router = express.Router();
const pool = require("../data/config");
const path = require("path");

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/login.html"));
});
router.post("/loginForm", (req, res) => {
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    (err, user) => {
      if (err) throw err;
      console.log(user);
      if (user.length == 0) {
        req.session.role = "anonim";
      } else {
        req.session.role = user[0].role;
      }
      res.sendFile(path.resolve(__dirname, "../public/posts.html"));
    }
  );
});
router.get("/posts", (req, res) => {
  pool.query("SELECT * FROM posts", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});
router.get("/user", (req, res) => {
  const role = req.session.role;
  if (role == undefined) {
    role == "anonim";
  }
  res.json(role);
});
module.exports = router;
