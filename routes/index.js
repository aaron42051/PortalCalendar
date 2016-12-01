var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentDate = moment();
  if(req.query.date)
  {
    currentDate = moment(req.query.date);
  }
  res.render('calendar/month', { title: currentDate.format('MMMM D, YYYY'),
  current: currentDate});

});

router.get('/week', function(req, res, next) {
  res.render('week');
});

router.get('/day', function(req, res, next) {
  res.render('day');
});

module.exports = router;
