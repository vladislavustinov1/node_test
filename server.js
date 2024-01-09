const express = require("express");
let routes = require("./routes/router");
const session = require("express-session");
const cookies = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
const userSession = require("./middleware/user_session");

const app = express();
let secretKey = "qwerty123";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(cookies(secretKey));
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(userSession);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.listen(3000);
