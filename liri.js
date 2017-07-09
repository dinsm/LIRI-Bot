var keys = require("./keys.js");
var request = require('request');
var twitter = require("twitter");
var spotify = require('spotify');
var omdb = require('omdb');


var argument = process.argv[2];
var value = process.argv[3];
var dataText = process.argv[4];


if(argument == "movie-this"){
    var movieName = process.argv[3];
    var movieURL = 'http://www.omdbapi.com/?t=' + movieName + '&plot=short&r=json';
    request(movieURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }else{
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&r=json&tomatoes=true",function(error, response,body){
                console.log(body);
            })
        }
    })
}


if(argument == "spotify-this-song"){
    var songTitle = process.argv[3];
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
        if ( process.argv[3] ) {
            var data = data.tracks.items;
            for(var i =0; i < data.length; i++){
                console.log(data[i].name); //song track name
                console.log(data[i].album.href); //url
                console.log(data[i].preview_url); //preview link to the song
                console.log(data[i].album.name); //album name

                for(var j =0; j < data[i].artists.length; j++){
                    console.log(data[i].artists[j].name); //artist's name
                }
            }
        }else{
            spotify.search({ type: 'track', query: "the sign"}, function(err, data){
                var data = data.tracks.items;
                console.log(data[0].name); //song track name
                console.log(data[0].album.href); //url
                console.log(data[0].album.name); //album name
                console.log(data[0].preview_url); //preview link to the song
                console.log(data[0].artists[0].name); //artist's name
            });
        }
    });
}



