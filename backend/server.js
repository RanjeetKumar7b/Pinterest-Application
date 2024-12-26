const express = require('express');
const bodyParser = require('body-parser')
const dbconnect = require('./db');
const flash = require('connect-flash');
const usermodel = require('./models/userschema');
const postmodel = require('./models/postschema');
const useregister = require('./routes/register');
const expressSession = require('express-session');
const passport = require('passport');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: "ranjeet",
  cookie: { maxAge: 60000 },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usermodel.serializeUser());
passport.deserializeUser(usermodel.deserializeUser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', useregister);
app.get('/register', (req, res) => {
  res.render('registration');
});
app.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') })
})
app.get('/', async function (req, res) {
  res.render('profile')
})
app.listen(6700, () => {
  console.log(`backend is running on port ${6700}`)
});
