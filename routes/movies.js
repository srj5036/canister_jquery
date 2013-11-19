var tomatoes = require('tomatoes');
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var rottom = tomatoes('tbkyppxenrg6ptz7fp7973z4');

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('moviesdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'moviesdb' database");
        db.collection('movies', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'movies' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findMovies = function(req, res) {
    db.collection('movies', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
            //console.log(items);
        });
    });
}

exports.addMovie = function(req, res) {
    console.log("Adding movie with id:" + req.body.id);

    rottom.get(req.body.id, function(err, results) {
        db.collection('movies', function(err, collection) {
            collection.insert(results, {safe:true}, function(err, result) {});
            console.log(results);
        });
    });
}

exports.searchMovie = function(req, res) {
    rottom.search(req.query.q, function(err, results) {
        res.send(results.slice(0,5));
    });
}


var populateDB = function() {

    var movies = [
    {
        title: "Finding Nemo",
        year: "2003",
        ratings: "G",
        releasedates: {
            "theater": "2003-05-30",
            "dvd": "2013-05-07"
        },
        runtime: "100",
        description: "Breathtaking animation, talented vocal work, and a well-written screenplay add up to another Pixar success.",
        poster: "missing.jpg",
        rotID: "9377"
    },
    {
        title: "Toy Story",
        year: "1995",
        ratings: "G",
        releasedates: {
            "theater": "1995-11-22",
            "dvd": "2001-03-20"
        },
        runtime: "80",
        description: "As entertaining as it is innovative, Toy Story kicked off Pixar's unprecedented run of quality pictures, reinvigorating animated film in the process.",        poster: "missing.jpg",
        rotID: "9559" 
    }];

    db.collection('movies', function(err, collection) {
        collection.insert(movies, {safe:true}, function(err, result) {});
    });

};