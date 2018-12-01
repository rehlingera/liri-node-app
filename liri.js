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
        function(response) {

            if(response.data.length===0){
                console.log("Sorry, no concert results for this band!");
            };

            for(i=0;i<response.data.length;i++){
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                console.log("----------");
            };
        }
    );
};

var spot = function (input) {
    var sptfy = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });
    
    sptfy.search({ type: 'track', query: input}, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    };

    for(i=0;i<data.tracks.items.length;i++) {
        console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Preview: " + data.tracks.items[i].preview_url);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("----------");
        };
    });
};

var movie = function (input) {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=c43c550e";
    
    axios.get(queryUrl).then(
      function(response) {
        
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("Ratings: ");
        for(i=0;i<response.data.Ratings.length;i++){
            console.log(" - " + response.data.Ratings[i].Source + ": " + response.data.Ratings[i].Value);
        };
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      }
    );
};

if(command==="concert-this"){
    input = process.argv[3];
    concert(input);
}

else if(command==="spotify-this-song"){
    input = process.argv[3];
    spot(input);
}

else if(command==="movie-this"){
    input = process.argv[3];
    movie(input);
}

else if(command==="do-what-it-says"){
    fs.readFile("random.txt","utf-8",function(err,data){
        if(err){
            console.log("There has been an error. Please try again.");
        };
        var randomArray = data.split(",");

        //Generate random number with a max of the array length/2
        var randomInt = Math.floor(Math.random() * (randomArray.length/2));
        
        //multiply the random number by 2 for the command
        com = randomInt*2;
        console.log("Command: " + randomArray[com])

        //add 1 to the command for the input
        inp = +com + 1;
        console.log("Input: " + randomArray[inp] + "\n==========");

        if(randomArray[com]==="concert-this"){
            input = randomArray[inp];
            concert(input);
        }
        else if(randomArray[com]==="spotify-this-song"){
            input = randomArray[inp];
            spot(input);
        }
        else if(randomArray[com]==="movie-this"){
            input = randomArray[inp];
            movie(input);
        }
    })
}

else {
    console.log("Command not recognized. Try one of the following:");
    console.log("concert-this [artist/band name]");
    console.log("spotify-this-song [song name]");
    console.log("movie-this [movie title]");
    console.log("do-what-it-says");
}