/* eslint-disable no-console */
const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./auth/passport.setup");
const { isLoggedIn } = require("./auth/verifyLogIn");
const cors = require("cors");
require("dotenv").config();

// Cookies and Session info
app.use(
  cookieSession({
    name: "user",
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);

// middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());

// Routers
// const { teacherRouter } = require('./routes/student');
// const { studentRouter } = require('./routes/teacher');
const passportRouter = require("./auth/routes");

// Database
// require('./db/db');

const PORT = process.env.SERVER_PORT || 8080;

// Routes //
// app.use('/teacher', teacherRouter);
// app.use('/student', studentRouter);
app.use("/auth/google", passportRouter);

app.get("/", (req, res) => {
  res.send("you are not logged in");
});

app.get("/account", isLoggedIn, (req, res) => {
  res.send("you are logged in");
});

app.get("/logout", (req, res) => {
  req.session = null; //destory the session
  req.logOut(); // logout from passport
  res.redirect("/"); // send them to where is needed
});

app.listen(PORT, () => {
  console.log(`🌌Server has started on port: 🚀${PORT}`);
});
