//Requiring all the necessary toos and documents...
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var fs = require("fs");

//Establishing the input variable on the global scope...
var input = "";

//Populating the "Liri.js" welcome message...
console.log("\n██╗     ██╗██████╗ ██╗        ██╗███████╗\n██║     ██║██╔══██╗██║        ██║██╔════╝\n██║     ██║██████╔╝██║        ██║███████╗\n██║     ██║██╔══██╗██║   ██   ██║╚════██║\n███████╗██║██║  ██║██║██╗╚█████╔╝███████║\n╚══════╝╚═╝╚═╝  ╚═╝╚═╝╚═╝ ╚════╝ ╚══════╝");
console.log("\nWelcome to the LIRI Bot!\n");

//Function to begin the program...
start = function () {
    //Begin inquirer...
    inquirer.prompt([
        //Starting command selection...
        {
            type: "list",
            name: "command",
            choices: ["Search for concerts", "Spotify a song", "Look up a movie", "Random command", "Exit"],
            message: "What would you like to do?"
        }
    ]).then(function (answers) {
        //If the user picks the concert function, ask for a band/artist name...
        if (answers.command === "Search for concerts") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "input",
                    message: "Enter band/artist name:"
                }
            ]).then(function (answers) {
                //...then execute the concert function with the name supplied...
                input = answers.input;
                concert(input);
            });
        }
        //If the user picks the Spotify function, ask for a song title...
        else if (answers.command === "Spotify a song") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "input",
                    message: "Enter song title:"
                }
            ]).then(function (answers) {
                //...then execute the Spotify function with the title supplied...
                input = answers.input;
                spot(input);
            });
        }
        //If the user picks the movie function, ask for a movie title...
        else if (answers.command === "Look up a movie") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "input",
                    message: "Enter movie title:"
                }
            ]).then(function (answers) {
                //...then execute the movie function with the title supplied...
                input = answers.input;
                movie(input);
            });
        }
        //If the user picks "random command," first access the random.txt file and pull the data...
        else if (answers.command === "Random command") {
            fs.readFile("random.txt", "utf-8", function (err, data) {
                if (err) {
                    console.log("There has been an error. Please try again.");
                };
                //...then split it into a table at the commas...
                var randomArray = data.split(",");

                //Generate random number with a max of the array length/2...
                var randomInt = Math.floor(Math.random() * (randomArray.length / 2));

                //Multiply the random number by 2 for the command, then log that command to the console for the user to see...
                com = randomInt * 2;
                console.log("Command: " + randomArray[com])

                //Add 1 to the command for the input, then log that input to the console for the user to see...
                inp = +com + 1;
                console.log("Input: " + randomArray[inp] + "\n==========");

                //If the command is "concert-this," execute the concert function with the input above...
                if (randomArray[com] === "concert-this") {
                    command = randomArray[com];
                    input = randomArray[inp];
                    concert(input);
                }
                //If the command is "spotify-this-song," execute the Spotify function with the input above...
                else if (randomArray[com] === "spotify-this-song") {
                    command = randomArray[com];
                    input = randomArray[inp];
                    spot(input);
                }
                //If the command is "movie-this," execute the movie function with the input above...
                else if (randomArray[com] === "movie-this") {
                    command = randomArray[com];
                    input = randomArray[inp];
                    movie(input);
                };
            });
        }
        //If the user picks the exit function, execute the end function...
        else if (answers.command === "Exit") {
            end();
        };
    });
};

//The end function:
end = function () {
    //Print the goodbye message to the console...
    console.log("\n██████╗██╗ ██╗ ████╗ ███╗  ██╗██╗ ██╗     ██╗ ██╗ █████╗ ██╗  ██╗██╗\n╚═██╔═╝██║ ██║██╔═██╗████╗ ██║██║██╔╝     ╚████╔╝██╔══██╗██║  ██║██║\n  ██║  ██████║██████║██╔██╗██║████╔╝       ╚██╔╝ ██║  ██║██║  ██║╚═╝\n  ██║  ██╔═██║██╔═██║██║╚████║██╔═██╗       ██║  ╚█████╔╝╚█████╔╝██╗\n  ╚═╝  ╚═╝ ╚═╝╚═╝ ╚═╝╚═╝ ╚═══╝╚═╝ ╚═╝       ╚═╝   ╚════╝  ╚════╝ ╚═╝");
    console.log("\nThank you for using LIRI Bot!\n");
};

//The concert function...
var concert = function (input) {
    //Establish the URL for the API, plugging in the unput passed in...
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    //Call the API using axios...
    axios.get(queryUrl).then(
        function (response) {
            //If the data is empty, print the "no results" message to the console...
            if (response.data.length === 0) {
                console.log("Sorry, no concert results for this band!");
            };
            //Establish the divider and responseData variables...
            var divider = "\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n\n";
            var responseData = [];
            //For each result, until the number of results is exhausted...
            for (i = 0; i < response.data.length; i++) {
                //...make an array containing the venue, location and date, with a line to break it away from the other results, and join it with a few break spaces...
                anotherResponse = [
                    "\nVenue: " + response.data[i].venue.name,
                    "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country,
                    "Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'),
                    "----------"
                ].join("\n\n");
                //...and push it to the responseData array...
                responseData.push(anotherResponse);
            };
            //Access the "log.txt" file and add responseData to it...
            fs.appendFile("log.txt", "Command: " + "concert-this" + "\nInput: " + input + "\n\n" + responseData.join("\n") + divider, function (err) {
                //If there is an error, tell the user...
                if (err) throw err;
                //Print response Data to the console for the user to see...
                console.log(responseData.join("\n"));
                //Ask the user to press Enter to continue, because the inquirer prompt prints above the results and may not be seen...
                console.log("Press Enter to continue");
            });
        }
    );
    //Ask the user to press Enter to continue...
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Press Enter to continue"
        }
    ]).then(function (answers) {
        //If the user presses enter, execute the start function again...
        if (answers.continue) {
            start();
        }
        //Otherwise, say good-bye by executing the end function...
        else {
            end();
        };
    });
};

//The Spotify function...
var spot = function (input) {
    //Make a new key and secret object with the constructor from the node-spotify-api...
    var sptfy = new Spotify({
        //Pull the id and secret from the keys file...
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    //Perform a Spotify search using the input provided...
    sptfy.search({ type: 'track', query: input }, function (err, data) {
        //If there has been an error, tell the user...
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        //Establish the divider and responseData variables...
        var divider = "\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n\n";
        var responseData = [];
        //For each result, until the number of results is exhausted...
        for (i = 0; i < data.tracks.items.length; i++) {
            //...establish an array with the artist, song title, preview link and album, with a line to break it away from the other results, and join it with a few break spaces...
            anotherResponse = [
                "\nArtist(s): " + data.tracks.items[i].artists[0].name,
                "Song: " + data.tracks.items[i].name,
                "Preview: " + data.tracks.items[i].preview_url,
                "Album: " + data.tracks.items[i].album.name,
                "----------",
            ].join("\n\n");
            //...then push it the the responseData array...
            responseData.push(anotherResponse);
        };
        //Access the "log.txt" file and add responseData to it...
        fs.appendFile("log.txt", "Command: " + "spotify-this-song" + "\nInput: " + input + "\n\n" + responseData.join("\n") + divider, function (err) {
            //If there is an error, ell the user...
            if (err) throw err;
            //Print the responseData to the console for the user to see...
            console.log(responseData.join("\n"));
            //Ask the user to press Enter to continue, because the inquirer prompt prints above the results and may not be seen...
            console.log("Press Enter to continue");
        });
    });
    //Ask the user to press Enter to continue...
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Press Enter to continue"
        }
    ]).then(function (answers) {
        //If the user presses Enter, exeute the start function again...
        if (answers.continue) {
            start();
        }
        //Otherwise, say good-bye with the end function...
        else {
            end();
        };
    });
};

var movie = function (input) {
    if (!input) {
        input = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=c43c550e";
    axios.get(queryUrl).then(function (response) {
        var allRatings = "";
        var divider = "\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n\n";
        for (i = 0; i < response.data.Ratings.length; i++) {
            allRatings = allRatings + response.data.Ratings[i].Source + ": " + response.data.Ratings[i].Value + ", "
        };
        var responseData = [
            "Title: " + response.data.Title,
            "Release Year: " + response.data.Year,
            "Ratings: " + allRatings,
            "Country: " + response.data.Country,
            "Language: " + response.data.Language,
            "Plot: " + response.data.Plot,
            "Actors: " + response.data.Actors
        ].join("\n\n");
        fs.appendFile("log.txt", "Command: " + "movie-this" + "\nInput: " + input + "\n\n" + responseData + divider, function (err) {
            if (err) throw err;
            console.log(responseData);
            console.log("Press Enter to continue");
        });
    });
    inquirer.prompt([
        {
            type: "confirm",
            name: "continue",
            message: "Press Enter to continue"
        }
    ]).then(function (answers) {
        if (answers.continue) {
            start();
        }
        else {
            console.log("Thank you for using LIRI Bot!");
        };
    });
};

//Start the program with the start function...
start();