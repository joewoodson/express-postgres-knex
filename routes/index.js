var express = require('express');
var router = express.Router();


// *** GET all shows *** //
router.get('/shows', function(req, res, next) {
  res.send('send shows back');
});


// *** add show *** //
router.post('/shows', function(req, res, next) {
  queries.add(req.body)
  .then(function(showID) {
    return queries.getSingle(showID);
  })
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

module.exports = router;
