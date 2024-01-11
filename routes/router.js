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
      if (user.length == 0) {
        req.session.role = "anonim";
      } else {
        pool.query(
          "SELECT * FROM userrole WHERE users_id = ?",
          [user[0].id],
          (err, role) => {
            if (err) throw err;
            if (role.length == 0) {
              throw new Error("Не удалось получить права доступа.");
            } else {
              pool.query(
                "SELECT * FROM permissions WHERE roles_id = ?",
                [role[0].roles_id],
                (err, perm) => {
                  if (err) throw err;
                  req.session.permission = perm[0].permissions;
                }
              );
            }
          }
        );
      }
      res.sendFile(path.resolve(__dirname, "../public/posts.html"));
    }
  );
});
router.get("/posts", (req, res) => {
  pool.query("SELECT * FROM posts", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
router.get("/user", (req, res) => {
  const permission = req.session.permission;
  if (permission == undefined) {
    permission == "read";
  }
  res.json(permission);
});
module.exports = router;
