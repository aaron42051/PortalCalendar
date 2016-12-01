var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var eventSchema = new Schema({ //put in another file later, along with model
//   title:  String,
//   startDate: Date,
//   endDate: Date,
//   desc: String
// });
//
// //use model to create entries
// var event = mongoose.model('Event', eventSchema);

/* GET home page. */


module.exports = router;


// router.postEvent
//   var newEvent = new eventModel(req.body);
//   newEvent.
//   hasConflicts().
// then(function(hasConflicts) {
//   if(!hasConflicts) {
//     save it
//   }
//   else inform user
// })
// .catch(function(err) {
//   reject(err);
// })
