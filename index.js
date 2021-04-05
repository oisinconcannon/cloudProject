var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/weatherDB');
var Schema = mongoose.Schema;

// https://github.com/mschwarzmueller/nodejs-basics-tutorial/blob/master/11-mongoose/routes/index.js

var userDataSchema = new Schema({
  city: {type: String},
}, {collection: 'searchHistory'});

var UserData = mongoose.model('searchHistory', userDataSchema);
router.post('/saveWeather', function(req, res, next) {
  var item =  req.body;
  var data = new UserData(item);
  data.save();
  console.log("Saved post: ");
  console.log(req.body);
  res.status(201).send({});
});

router.post('/getHistory', function(req, res, next) {

//  var data = new UserData(item);
  UserData.find()
    .then(function(doc) {
      console.log("Sending: " + doc.length + " posts to app");
      res.status(201).send({city: doc});
    });
});

module.exports = router;
