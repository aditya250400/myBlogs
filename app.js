const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//read mysql
const mysql = require('mysql');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require("./routes/blogs");

const app = express();

//passport
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const User = require("./models/users");

//passport-facebook
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "1404446123294071",
    clientSecret:"d708880c03ee5dff7e0c359ac39f7102",
    callbackURL: "http://localhost:3000/users/facebook-login/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport config
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne(con, {username: username}, (err, rows) => {
      const user = rows[0]
      if (!user) {
        // Handle if user is not found
        return done(null, false);
      }
      if (user.password === password) {
        return done(null, user);
      } else {
        // Handle if password does not match
        return done(null, false);
      }
    })
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



//setup database

const con = mysql.createConnection({
  host: 'sql5.freemysqlhosting.net',
  user: 'sql5483078',
  password: 'RgRSM5IDfb',
  database: 'sql5483078'
})

con.connect((err) => {
  if(err) throw err;
  console.log("Connected!");
})

// store the con inside the req
app.use((req, res, next) => {
  req.con = con
  next()
})





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/blogs", blogsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
