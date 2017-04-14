var cool = require('cool-ascii-faces');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var pg = require('pg');

var router = require('./routes/index');
var queries = require('./db/queries');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser').json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/time', function(req, res) {
  var result = ''
  var times = process.env.TIMES || 5
  for (i=0; i < times; i++)
    result += i + ' ';
  res.send(result);
});

// **** Get all shows ******* //
app.get('/shows', function(req, res, next) {
  queries.getAll()
  .then(function(shows) {
    res.status(200).json(shows);
  })
  .catch(function(error) {
    next(error);
  });
});

// **** Get single show ***** //
app.get('/show/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
  .then(function(show) {
    if (!show) {
      res.status(404);
      res.send('No show found');
    }
    res.status(200).json(show);
  })
  .catch(function(error) {
    res.render('error', { error: err });
    next(error);
  });
});

// *** Add show *** //
app.post('/shows', function(req, res, next) {
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

// **** Update show ******* //
app.put('/shows/:id', function(req, res, next) {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the ID field'
    });
  }
  queries.update(req.params.id, req.body)
  .then(function(showID) {
    return queries.getSingle(req.params.id);
  })
  .then(function(show) {
    res.status(200).json(show);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** Delete show *** //
app.delete('/shows/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
  .then(function(show) {
    queries.deleteItem(req.params.id)
    .then(function() {
      res.status(200).json(show);
    })
    .catch(function(error) {
      next(error);
    });
  }).catch(function(error) {
    next(error);
  });
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
