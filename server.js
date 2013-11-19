
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var movie = require('./routes/movies');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// Get Rotten Tomatoes seach results
app.get('/search', movie.searchMovie);

// Get the list of movies
app.get('/movies', movie.findMovies);

// Add a movie to the list
app.post('/movie', movie.addMovie);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


