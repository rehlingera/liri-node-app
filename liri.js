require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require('node-spotify-api');

var moment = require("moment");

var fs = require("fs");

var command = process.argv[2];
var input = "";

var concert = function (input) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function (response) {
            if (response.data.length === 0) {
                console.log("Sorry, no concert results for this band!");
            };
            var divider = "\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n\n";
            var responseData = [];
            for (i = 0; i < response.data.length; i++) {
                anotherResponse = [
                    "\nVenue: " + response.data[i].venue.name,
                    "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country,
                    "Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'),
                    "----------"
                ].join("\n\n");
                responseData.push(anotherResponse);
            };
            fs.appendFile("log.txt", "Command: " + command + "\nInput: " + input + "\n\n" + responseData.join("\n") + divider, function (err) {
                if (err) throw err;
            console.log(responseData.join("\n"));
            });
        }
    );
};

var spot = function (input) {
    var sptfy = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    sptfy.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        var divider = "\n:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::\n\n";
        var responseData = [];
        for (i = 0; i < data.tracks.items.length; i++) {
            anotherResponse = [
            "\nArtist(s): " + data.tracks.items[i].artists[0].name,
            "Song: " + data.tracks.items[i].name,
            "Preview: " + data.tracks.items[i].preview_url,
            "Album: " + data.tracks.items[i].album.name,
            "----------",
            ].join("\n\n");
            responseData.push(anotherResponse);
        };
        fs.appendFile("log.txt", "Command: " + command + "\nInput: " + input + "\n\n" + responseData.join("\n") + divider, function (err) {
            if (err) throw err;
        console.log(responseData.join("\n"));
        });
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
        fs.appendFile("log.txt", "Command: " + command + "\nInput: " + input + "\n\n" + responseData + divider, function (err) {
            if (err) throw err;
            console.log(responseData);
        });
    });
}

if (command === "concert-this") {
    input = process.argv.slice(3).join(" ");
    concert(input);
}

else if (command === "spotify-this-song") {
    input = process.argv.slice(3).join(" ");
    spot(input);
}

else if (command === "movie-this") {
    input = process.argv.slice(3).join(" ");
    movie(input);
}

else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function (err, data) {
        if (err) {
            console.log("There has been an error. Please try again.");
        };
        var randomArray = data.split(",");

        //Generate random number with a max of the array length/2
        var randomInt = Math.floor(Math.random() * (randomArray.length / 2));

        //multiply the random number by 2 for the command
        com = randomInt * 2;
        console.log("Command: " + randomArray[com])

        //add 1 to the command for the input
        inp = +com + 1;
        console.log("Input: " + randomArray[inp] + "\n==========");

        if (randomArray[com] === "concert-this") {
            command = randomArray[com];
            input = randomArray[inp];
            concert(input);
        }
        else if (randomArray[com] === "spotify-this-song") {
            command = randomArray[com];
            input = randomArray[inp];
            spot(input);
        }
        else if (randomArray[com] === "movie-this") {
            command = randomArray[com];
            input = randomArray[inp];
            movie(input);
        }
    })
}

else {
    console.log("Command not recognized. Try one of the following:\nconcert-this [artist/band name]\nspotify-this-song [song name]\nmovie-this [movie title]\ndo-what-it-says");
}