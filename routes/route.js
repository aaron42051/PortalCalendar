var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var event1 = require('./events');


var eventSchema = new Schema({ //put in another file later, along with model
  title:  String,
  start: Date,
  end: Date,
  desc: String,
  repeat: Boolean,
  weekdays: Array,
  datetime: String
});
eventSchema.methods.hasConflicts = function() {
  console.log("hasConflicts");
  that = this;
  return new Promise(function(resolve, reject) {
    eventModel.find({$or: [
      {$and: [{start:{$lte: that.start}}, {end:{$gt: that.start}}]},
      {$and: [{start:{$lte: that.end}},{end:{$gt: that.end}}]}
    ]})
    .then(function(err, events) {
      resolve(events.length !== 0)})
    .catch(function(err) {
      return console.log('error: ', err);
    });
  });
  that.setMaxListeners(0);
}

var eventModel = mongoose.model('events', eventSchema);
router.get('/', function(req, res, next) {
  eventModel.find(function (err, events){
    if(err) return console.error(err);
  res.send(events);
  });
});

// router.post('/', function(req, res, next){
//   var newEvent = new eventModel({
//     title: req.body["title"],
//     start: req.body["start"],
//     end: req.body["end"],
//     repeat: req.body["repeat"],
//     desc: req.body["desc"],
//     weekdays: req.body["weekdays"],
//     datetime: req.body["datetime"]
//   });
// process.setMaxListeners(0);
//   newEvent.save(function (err, event) {
//     if(err) {
//       console.log(err);
//       res.send(err);
//     } else {
//       console.log('all good');
//       res.json(event);
//     }
//   });



router.delete('/:id', function(req, res, next){
  eventModel.remove({_id: req.params.id}, function(err){
    if(err) res.send("Nothing to remove (probably)!");
  });
  res.send("Removed: " + req.params.id);

});

router.patch('/:id', function(req, res, next){

    eventModel.findByIdAndUpdate(req.params.id, {title:req.body["title"]},
    {new:true}, function(err, event){});

  res.send("Patched");

});

router.post('/', function(req, res, next)
{
  console.log("WE POST");
  var newEvent = new eventModel(req.body);
  newEvent.
  hasConflicts().
  then(function(hasConflicts) {
    console.log("We are in here?");
    if(!hasConflicts) {
      newEvent.save(function(err, event)
      {
        if(err) {
          console.log(err);
          res.send(err);
        } else {
            console.log('all good');
            res.json(eventModel);
        }
      });
    }
    else {
      res.send("Collision!");
    } //inform user
})
.catch(function(err) {
  console.log("!!!");

  return res.json({
    status: 'error2',
    result: err
    });
  })

});

module.exports = router;
