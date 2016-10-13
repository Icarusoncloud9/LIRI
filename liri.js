// ------------------------------------------------------------------------------------------------
// Load the requires packages to read, write, and run commands
// ------------------------------------------------------------------------------------------------

var fs = require('fs');

var inquirer = require('inquirer');

var request = require('request');

var omdb = require('omdb');

var spotify = require('spotify');

var Twitter = require('twitter');

// ------------------------------------------------------------------------------------------------
// State my variables
// ------------------------------------------------------------------------------------------------

// Stores the user name
var name;

// Create a list of commands
var commandTweets = "my-tweets";

var commandSpotify = "spotify-this-song";

var commandMovie = "movie-this";

var commandConfirm = true;


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
function getTwitter(){

    // Test to see if Twitter is working
    // console.log("Twitter is working!");

    // Paste the sample code from npm
    var client = new Twitter({

        consumer_key: 'sUwRjNCSJOvsQUngm12syFBct',

        consumer_secret: '760IuzuMTtLQip8yd9TrOmc8Bs08Qxoo4DXYLZBfRkQwTSlepD',

        access_token_key: '784523687626170368-qPkpiEcTGXy2NNGGDS2hLeLtgv1dSvi',

        access_token_secret: 'aHGQsKBCv8JIUE5eDeoX9ZMc79dQsEWdOS4e8GH9ZB7uq',

    });
     
    var params = {screen_name: 'FuakataStudios'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

      if (!error) {

        for(var i = 0; i < 10; i++) {

            if (tweets[i] == null || tweets[i] == undefined) {
                break;
            }

        // console.log(JSON.stringify(tweets[i], null, 2));

        console.log(tweets[i].text);
            
        }

      }

    });

    // client.get('favorites/list', function(error, tweets, response) {

    //   if(error) throw error;

    //   console.log(tweets);  // The favorites. 

    //   console.log(JSON.stringify(response, null, 2));  // Raw response object. 

    // });

}

// If the "spotify" function is called...
function getSpotify(b){

    // Test to see if Spotify works
    // console.log("Spotify works!");

    // Paste the sample code from npm
    spotify.search({ type: 'track', query: b }, function(err, data) {

    if ( err ) {
        
        console.log('Error occurred: ' + err);
        
        return;
        
    }

    // console.log("The raw data: " + JSON.stringify(data, null, 3));
    
    for(var i = 0; i < data.tracks.items.length; i++) {

    // Do something with 'data' 
    console.log("=================================================================");

    console.log("Potential Song Origin ~ " + i);
    
    for(var j = 0; j < data.tracks.items[i].artists.length; j++) {

        console.log("Artist involved:   " + data.tracks.items[i].artists[j].name);
        
    }

    console.log("Album Name:        " + data.tracks.items[i].album.name);

    console.log("Song Name:         " + value);

    console.log("=================================================================");

    console.log("");

    console.log("");

        }
    
    });

}

// If the "movie" function is called
function getMovie(b){

    // Test to see if OMDB is working properly;
    // console.log("OMDB Works!");

    // Paste the sample code from npm
    omdb.search(b, function(err, movies) {
    
    if(err) {
    
        return console.error(err);
    
    }
 
    if(movies.length < 1) {
    
        return console.log('No movies were found!');
    
    }
 
    movies.forEach(function(movie) {
        
        omdb.get({ title: movie.title }, true, function(err, particularMovie) {

            if(err) {
             
                return console.error(err);
            
            }
         
            if(!movie) {
            
                return console.log('Movie not found!');
            
            }

            // console.log("line 203", particularMovie);
  
            console.log("=======================================================================");

            console.log('%s', "Movie: " + particularMovie.title );

            console.log("");

            console.log('%s', "Released on: " + particularMovie.year );

            console.log("");

            console.log('%s', "Rated: " + particularMovie.rated );

            console.log("");

            console.log('%s', "Genres: " + particularMovie.genres );

            console.log("");

            console.log('%s', "Director: " + particularMovie.director );

            console.log("");

            console.log('%s', "Actors: " + particularMovie.actors );

            console.log("");

            console.log('%s', "Plot: " + particularMovie.plot );

            console.log("");

            console.log('%s', "Rating of Movie: " + particularMovie.imdb.rating );

            console.log("");

            console.log("=======================================================================");

            console.log("");

            console.log("");

        });
        

    
    });
 


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

        choices: [commandTweets, commandSpotify, commandMovie],

        name: "command"

    }

]).then(function (user) {

    // Figure out what information we are getting back from the user
    // console.log(JSON.stringify(user, null, 2));

    // This is going to update the global variable action to check which if statement applies to this situation
    action = user.command;

    // This is going to update the global variable name for use in the greeting function
    name = user.name;

    // If tweets are picked
    if (action == commandTweets) {

        greeting();

        console.log("");

        console.log(name + " Here are your latest tweets!");

        console.log("");

        getTwitter();

    }

    // If spotify is picked
    else if (action == commandSpotify) {

        greeting();

        inquirer.prompt([

        {

            type: "input",

            message: "What song would you like to look up?",

            name: "songName"

        }]).then(function(song) {

        console.log("");

        console.log(name + " Your spotify song is " + song.songName)    

        console.log("");

        value = song.songName;

        getSpotify(song.songName);

        });

    } 

    // If movie is picked
    else if (action == commandMovie) {

        greeting();

        inquirer.prompt([

        {

            type: "input",

            message: "What movie would you like to look up?",

            name: "omdb"

        }]).then(function(movie) {

        console.log("");

        console.log(name + " Your movie is " + movie.omdb);

        console.log("");

        getMovie(movie.omdb);

        });
    }

});

