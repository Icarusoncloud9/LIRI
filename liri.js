// ------------------------------------------------------------------------------------------------
// Load the requires packages to read, write, and run commands
// ------------------------------------------------------------------------------------------------

var fs = require('fs');

var inquirer = require('inquirer');

var request = require('request');

var omdb = require('omdb');

var spotify = require('spotify');

var twitter = require('twitter');

// ------------------------------------------------------------------------------------------------
// State my variables
// ------------------------------------------------------------------------------------------------

// Stores the user name
var name;

// Create a list of commands
var tweets = "my-tweets";

var spotify = "spotify-this-song";

var movie = "movie-this";

// Values to store

var song;

var movie;



// Take two arguments. 

// The first will be the action (i.e. "my-tweets", "spotify-this-song", etc.)
var action;

// The second will be the item that will be used for the api request, play a song, etc.
var value;

// ------------------------------------------------------------------------------------------------
// Create my functions
// ------------------------------------------------------------------------------------------------

// This is a default function to reduce the amount of times I have to repeat myself
function greeting(){

        console.log("");

        console.log("");

        console.log("Hello " + name + "!");        

        console.log("");

        console.log("");
}

// If the "twitter" function is called...
function twitter(){

    console.log("Twitter is working!");

    // Paste the sample code from npm
    var client = new Twitter({

        consumer_key: 'sUwRjNCSJOvsQUngm12syFBct',

        consumer_secret: '760IuzuMTtLQip8yd9TrOmc8Bs08Qxoo4DXYLZBfRkQwTSlepD',

        access_token_key: '784523687626170368-qPkpiEcTGXy2NNGGDS2hLeLtgv1dSvi',

        access_token_secret: 'aHGQsKBCv8JIUE5eDeoX9ZMc79dQsEWdOS4e8GH9ZB7uq',

    });
     
    var params = {screen_name: 'nodejs'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

      if (!error) {

        console.log(tweets);

      }

    });

    client.get('favorites/list', function(error, tweets, response) {

      if(error) throw error;

      console.log(tweets);  // The favorites. 

      console.log(response);  // Raw response object. 

    });

}

// If the "spotify" function is called...
function spotify(){

    // Paste the sample code from npm
    spotify.search({ type: 'track', query: song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;

        console.log(JSON.stringify(data, null, 2));
    }
 
    // Do something with 'data' 

});

}

// If the "movie" function is called
function movie(){

    // Paste the sample code from npm
    omdb.search(movie, function(err, movies) {
    if(err) {
        return console.error(err);
    }
 
    if(movies.length < 1) {
        return console.log('No movies were found!');
    }
 
    movies.forEach(function(movie) {
        console.log('%s (%d)', movie.title, movie.year);
    });
 
    // Saw (2004) 
    // Saw II (2005) 
    // Saw III (2006) 
    // Saw IV (2007) 
    // ... 
});
 
omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
    if(err) {
        return console.error(err);
    }
 
    if(!movie) {
        return console.log('Movie not found!');
    }
 
    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);
 
    // Saw (2004) 7.6/10 
    // Two men wake up at opposite sides of a dirty, disused bathroom, chained 
    // by their ankles to pipes. Between them lies... 
});

}

// ------------------------------------------------------------------------------------------------
// Create my main code
// ------------------------------------------------------------------------------------------------


// First we have a welcoming message for the user
console.log("==================================================================");

console.log("");

console.log("Welcome to liri.");

console.log("Liri stands for Language Interpretation and Recognition Interface!");

console.log("");

console.log("==================================================================");

inquirer.prompt([
    
    // Second we ask for the user's name
    {

        type: "input",

        message: "What is your name?",

        name: "name"

    },

    // Third we ask the user for which command they would like to execute
    {

        type: "list",

        message: "What command would you like to execute",

        choices: [tweets, spotify, movie],

        name: "command"

    },

    {
        type: "confirm",
        
        message: "Are you sure?",

        name: "confirm",

        default: true

    }

]).then(function (user) {

    // Figure out what information we are getting back from the user
    console.log(JSON.stringify(user, null, 2));

    // This is going to update the global variable action to check which if statement applies to this situation
    action = user.command;

    // This is going to update the global variable name for use in the greeting function
    name = user.name;

    // If tweets are picked
    if (action == tweets) {

        greeting();

        console.log("Here are your latest tweets!");

        console.log("");

        twitter();

    }

    // If spotify is picked
    else if (action == spotify) {

        greeting();

        inquirer.prompt([

        {

            type: "input",

            message: "What song would you like to look up?",

            name: "spotify"

        }]).then(function(song) {

        console.log("Your spotify song is " + song.spotify)    

        song = song.spotify;

        });

    } 

    // If movie is picked
    else if (action == movie) {

        greeting();

        inquirer.prompt([

        {

            type: "input",

            message: "What movie would you like to look up?",

            name: "omdb"

        }]).then(function(movie) {

        console.log("Your movie is " + movie.omdb);

        movie = movie.omdb;

        });
    }

});

