

var fs = require("fs");
var keys = require("keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");
var omdb = require("omdb");
var twitterKeys = require("./keys.js").twitterKeys;
var colors = require('colors');

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the data
var selections = inputString[2];
var argumentOne = process.argv[3];

var argument = process.argv[2];
var value = process.argv[3];
var dataText = process.argv[4];




// Based on the selections we run the appropriate if statement
    if (selections === "my-tweets"){
        myTweets();

    } else if (selections === "spotify-this-song"){
        mySpotify(argumentOne);

    } else if (selections === "movie-this"){
        omdb(argumentOne);

    } else if (selections === "do-what-it-says"){
        doWhatItSays();
    }



// Twitter function
function myTweets() {
    var client = twitterKeys;
    var params = {screen_name: 'scentfinder'};

    // send out the call to the Twitter API
    client.get('statuses/user_timeline', params, function(error, timeline, response) {
        if (!error) {
            for (tweet in timeline) {
                if (tweet < 10) {
                    // get the date of the tweet
                    var tweetDate = new Date(timeline[tweet].created_at);

                    // log out the date and text of our latest tweets.
                    console.log("Tweet #".green + (parseInt(tweet) + 1) + " Date: ".green + tweetDate.toString().slice(0, 24));
                    console.log(timeline[tweet].text);
                    console.log("\n");

                    fs.appendFile('log.txt', " Tweet #" + (parseInt(tweet) + 1) + " Date: " + tweetDate.toString().slice(0, 24));
                    fs.appendFile('log.txt', timeline[tweet].text);
                }
                else {
                    return true;
                }
            }
        }
        else {
            console.log(error);
        }
    });
}



// OMDB function
if(argument === "movie-this"){
    var movieName = process.argv[3];
    var movieURL = 'http://www.omdbapi.com/?t=' + movieName + '&plot=short&r=json';
    request(movieURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece",function(error, response,body){
                console.log(body);
            })
        }
    })
}
function omdb(argumentOne){
    if(argumentOne === undefined){
        argumentOne = 'Mr. Nobody';
    }

    // send out the call to the OMDB API
    request('http://www.omdbapi.com/?t='+argumentOne+'&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
        if (!error) {
            var json = JSON.parse(body);

            console.log("Title: ".green + json.Title);
            console.log("Year: ".green + json.Year);
            console.log("IMDB Rating: ".green + json.imdbRating);
            console.log("Country: ".green + json.Country);
            console.log("Language: ".green + json.Language);
            console.log("Plot: ".green + json.Plot);
            console.log("Actors: ".green + json.Actors);
            console.log("Rotten Tomatoes rating: ".green + json.tomatoRating);
            console.log("Rotten Tomatoes URL: ".green + json.tomatoURL);
            console.log("\n");

            fs.appendFile('log.txt', "Title: " + json.Title + "\n");
            fs.appendFile('log.txt', "Year: " + json.Year + "\n");
            fs.appendFile('log.txt', "IMDB Rating: " + json.imdbRating + "\n");
            fs.appendFile('log.txt', "Country: " + json.Country + "\n");
            fs.appendFile('log.txt', "Language: " + json.Language + "\n");
            fs.appendFile('log.txt', "Plot: " + json.Plot + "\n");
            fs.appendFile('log.txt', "Actors: " + json.Actors + "\n");
            fs.appendFile('log.txt', "Rotten Tomatoes rating: " + json.tomatoRating + "\n");
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + json.tomatoURL + "\n");
        }
    })
}





// Spotify function
function mySpotify(argumentOne) {

    if (argumentOne === undefined) {
       argumentOne = "What's my age again";
    }

    if (argument === "spotify-this-song") {
        var songTitle = process.argv[3];
        spotify.search({type: 'track', query: songTitle}, function (err, data) {

            if (process.argv[3]) {
                var data = data.tracks.items;
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].name); //song track name
                    console.log(data[i].album.href); //url
                    console.log(data[i].preview_url); //preview link to the song
                    console.log(data[i].album.name); //album name

                    for (var j = 0; j < data[i].artists.length; j++) {
                        console.log(data[i].artists[j].name); //artist's name
                    }
                }

            } else {
                spotify.search({type: 'track', query: "the sign"}, function (err, data) {
                    var data = data.tracks.items;
                    console.log(data[0].name); //song track name
                    console.log(data[0].album.href); //url
                    console.log(data[0].album.name); //album name
                    console.log(data[0].preview_url); //preview link to the song
                    console.log(data[0].artists[0].name); //artist's name
                });

            for (k=0; k<items[i].artists.length; k++){
                    fs.appendFile('log.txt', " Artist: " + items[i].artists[k].name);
                }
                    fs.appendFile('log.txt', ", Song Name: " + items[i].name);
                    fs.appendFile('log.txt', ", Preview Link of the song from Spotify: "+items[i].preview_url);
                    fs.appendFile('log.txt', ", Album Name: "+items[i].album.name);
            });
            }
    }
})
}



 function doWhatItSays(){
    fs.readFile("random.txt", 'utf8', function(err, data){
        if (err) throw err;

        var things = data.split(',');
        var partTwo = things[1];

        mySpotify(partTwo);
    });
}
