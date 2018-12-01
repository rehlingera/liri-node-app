# liri-node-app

An app designed to make API calls for movies, songs, and concerts.

## How to use

1. Open up the Git Bash window and navigate to the folder containing the liri node app.

![Step 1](https://github.com/rehlingera/liri-node-app/blob/master/assets/Step1.PNG "Step 1")

2. Type `node` to call on Node.js, then type `liri.js` to call on the liri-node-app.

    ![Step 2](https://github.com/rehlingera/liri-node-app/blob/master/assets/Step2.PNG "Step 2")

3. On the same line, type one of the following commands:

    ![Step 3 A](https://github.com/rehlingera/liri-node-app/blob/master/assets/Step3a.PNG "Step 3 A")
    * `concert-this`: This will take a band or musician name and perform a search of 20 upcoming tour dates and locations. If the band is not currently touring, the app will return "Sorry, no concert results for this band!"

    ![Step 3 B](https://github.com/rehlingera/liri-node-app/blob/master/assets/Step3b.PNG "Step 3 B")
    * `spotify-this-song`: This command will take a song name, search for it on Spotify and return up to 20 results, along with the corresponding artists, the album and a link to a preview (if available).

    ![Step 3 C](https://github.com/rehlingera/liri-node-app/blob/master/assets/Step3c.PNG "Step 3 C")
    * `movie-this`: This command will take a movie title and search the Open Movie Database, returning the most relevant result.

    ![Step 3 D](https://github.com/rehlingera/liri-node-app/blob/master/assets/Step3d.PNG "Step 3 D")
    * `do-what-it-says`: This command will run a random command stored in the "random.txt" file and display its result.
    
4. On the same line, type your artist, band, song or movie. Names with spaces should be enclosed in double quotes (`"The Dear Hunter"` or `"The Godfather"`). This is allowed, but not necessary, for single word inputs.

## Examples
concert-this:
![ConcertExample](https://github.com/rehlingera/liri-node-app/blob/master/assets/ConcertExample.PNG "ConcertExample")

spotify-this-song:
![SpotifyExample](https://github.com/rehlingera/liri-node-app/blob/master/assets/SpotifyExample.PNG "SpotifyExample")

movie-this:
![MovieExample](https://github.com/rehlingera/liri-node-app/blob/master/assets/MovieExample.PNG "MovieExample")

do-what-it-says:
![DoWhatItSaysExample](https://github.com/rehlingera/liri-node-app/blob/master/assets/DoWhatItSaysExample.PNG "DoWhatItSaysExample")