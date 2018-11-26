require("dotenv").config();
// var keys = require("keys.js");

var axios = require("axios");

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var input = process.argv[3];

if(command==="concert-this"){

}

else if(command==="spotify-this-song"){
    var queryURL = "https://api.spotify.com/v1/search?q=" & input & "&type=track%2Cartist&market=US&limit=1";
    axios.get(queryURL).then(
        function(response){
            console.log(response);
        }
    );
}


else if(command==="movie-this"){
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);
    
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
    
}


else if(command==="do-what-it-says"){

}