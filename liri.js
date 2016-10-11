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

// Boolean loop

var condition;



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

    // Paste the sample code from npm

}

// If the "spotify" function is called...
function spotify(){

    // Paste the sample code from npm

}

// If the "movie" function is called
function movie(){

    // Paste the sample code from npm

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

        });
    }

});

