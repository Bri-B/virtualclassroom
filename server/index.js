/* eslint-disable no-console */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
// const { studentRouter } = require('./routes/student');
const bodyParser = require('body-parser');
const { teacherRouter } = require('./routes/teacher');
const models = require('./db/models/index');
const passportRouter = require('./routes/auth');
require('./auth/passport.setup');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(
  cookieSession({
    name: 'user',
    keys: [process.env.COOKIE_SESSION_KEY],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Html
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

const PORT = process.env.SERVER_PORT || 8080;

// Routes
app.use('/auth/google', passportRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

app.get('/login', (req, res) => {
  console.log(`Serving ${req.method} from ${req.url}`);
  console.log('&&RES&&', req.user);
  res.json(req.user);
});

app.get('/logout', (req, res) => {
  console.log(`Serving ${req.method} from ${req.url}`);
  // req.session.passport = null;
  req.logOut(); // logout from passport
  req.session = null; // destory the session
  res.redirect('/'); // send them to where is needed
});

app.get('/*', (req, res) => {
  console.log(`Serving ${req.method} from ${req.url}`);
  res.sendFile(HTML_FILE);
});

// Database Connection
const connection = async () => {
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncModels = async () => {
  try {
    await models.sequelize.sync();
    console.log('Models have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};

connection();
syncModels();
app.listen(PORT, () => {
  console.log(`🌌Server has started on port: 🚀${PORT}`);
});
