var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var events = require('./routes/events');
var route  = require('./routes/route');
var index = require('./routes/index');
//require calendar/views
var app = express();
var session = require('client-sessions');

app.use(session({
  cookieName: 'session',
  secret: 'ajching',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//checks db for user record/verifies passoword, stores into cookie
// app.post('/login', function(req, res) {
//   User.findOne({ email: req.body.email }, function(err, user) {
//     if (!user) {
//       res.render('login.jade', { error: 'Invalid email or password.' });
//     } else {
//       if (req.body.password === user.password) {
//         res.redirect('/dashboard');
//       } else {
//         res.render('login.jade', { error: 'Invalid email or password.' });
//       }
//     }
//   });
// });


//used to get user data with the session
// app.get('/dashboard', function(req, res) {
//   if (req.session && req.session.user) { // Check if session exists
//     // lookup the user in the DB by pulling their email from the session
//     User.findOne({ email: req.session.user.email }, function (err, user) {
//       if (!user) {
//         // if the user isn't found in the DB, reset the session info and
//         // redirect the user to the login page
//         req.session.reset();
//         res.redirect('/login');
//       } else {
//         // expose the user to the template
//         res.locals.user = user;
//
//         // render the dashboard page
//         res.render('dashboard.jade');
//       }
//     });
//   } else {
//     res.redirect('/login');
//   }
// });

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
.once('open', function () {
  console.log('Mongodb connected');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/calendar', index);
app.use('/users', users);
app.use('/events', events);
app.use('/route', route);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
