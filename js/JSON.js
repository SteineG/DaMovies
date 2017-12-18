//User should enter API key to get access to movie database (not in use atm)
var apiKey = "615751d0824b26af2c6d0cb583c2a8ae";

//Get the list of official genres for movies.
//https://api.themoviedb.org/3/genre/movie/list?api_key=615751d0824b26af2c6d0cb583c2a8ae&language=en-US

//The base URL will look like: http://image.tmdb.org/t/p/ then you'll need a size let's say w185 then the poster path you got, so this is the final url http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg and this is the docs where you can find out more: http://docs.themoviedb.apiary.io/#reference/account/get?console=1 
var baseURL = "https://api.themoviedb.org/3";


//These are the the sizes of the images: "w92", "w154", "w185", "w342", "w500", "w780", or "original";
var baseURL_thumbnails = "http://image.tmdb.org/t/p/w342/";
var baseURL_infoImg = "http://image.tmdb.org/t/p/w780/";

var genreChosen = "";
var genreIndex = "";

//var indexPath = "/api/index.json";

//var uriArray = [];
//var uriPath = "";

var genreTitleArray = [];

//Load genres
$.getJSON( baseURL + "/genre/movie/list?api_key=" + apiKey, function( data ) {
    var genreArray = [];
    var arraySize = 10; //I could have used all 19 but i focus on just 5 in this project

    //Push each genre to the array
    for(var i = 0; i < arraySize; i++){

        var genreTitle = data.genres[i].name;

        var genreId = data.genres[i].id;

        //Only first item should have the class 'selected1'
        if(i == 0){
            genreArray.push( "<li class='selected1 selected1-border'><a id=genreIndex-" + i + " href='#'>" + genreTitle + "</a></li>" );
        } else {
            genreArray.push( "<li><a id=genreIndex-" + genreId + " href='#'>" + genreTitle + "</a></li>" );
        }

        //Push all uri paths and title to arrays 
        //uriArray.push(data.contentPanelElements.contentPanelElement[i]['@uri']);
        //genreTitleArray.push(data.contentPanelElements.contentPanelElement[i].title);
    }

    //Append array to div
    $( "<ul/>", {
        "class": "nav navbar-nav",
        html: genreArray.join( "" )
    }).appendTo( "nav" );
});


//Get thumbnails from the respective genre
function getThumbnails(index) {

    genreIndex = index.split("-")[1];
    //uriPath = uriArray[genreIndex];
    genreChosen = genreTitleArray[genreIndex];

    //Load the thumbnails
    $.getJSON( baseURL + "/discover/movie?api_key=" + apiKey + "&sort_by=popularity.desc&page=1&with_genres=" + genreIndex, function( data ) {
        
        //First clear the grid
        $("#grid-column").children("img").remove();

        //Push each movie to the array
        var arraySize = data.results.length;
        for(var i = 1; i <= arraySize; i++){

            //Get thumbnail from url
            var imagePath = data.results[i].poster_path;
            var imageID = data.results[i].id;

            var imageURL = baseURL_thumbnails + imagePath;
            console.log(imageURL);

            $("#grid-column").append("<img id=" + i + " src=" + imageURL + " data="+ imageID +">");
            $("#1").toggleClass("selected2");
        }
    });
}

//Clear all info fields
function clearInfoFields(){
    $("#movie-title").children("h1").remove();
    $("#movie-length").children("p").remove();
    $("#movie-country").children("p").remove();
    $("#movie-language").children("p").remove();
    $("#infoImgWrapper").children("img").remove();
    $("#descriptionWrapper").children("textarea").remove();
}

//Get info about the choosen movie
function getMovieInfo() {

    clearInfoFields();

    //Get id of movie clicked
    var movieClicked = selected2.attr('data');

    $.getJSON( baseURL + "/movie/"+ movieClicked +"?api_key=" + apiKey, function( data ) {

        //Title and year
        var title = data.title;
        var year = data.release_date;
        var tempDateArray = new Array();
        tempDateArray = year.split("-");
        year = tempDateArray[0];
        $("#movie-title").append("<h1 class='display-4 mb-2'>" + title + " (" + year + ")</h1>");

        //Length
        var length = data.runtime;
        var hours = parseInt(length / 60);
        var min = parseInt(length % 60);
        $("#movie-length").append("<p>" + hours + "t " + min + "min</p>");

        //Show only the main country
        //var tempCountryArray = new Array();
        //tempCountryArray = countries.split(",");
        var country = data.production_countries[0].name;
        $("#movie-country").append("<p>" + country + "</p>");

        //Rating
        var rating = data.vote_average;
        var ratingText = "";
        if (rating > 8.4) { ratingText = "Masterpiece" } else if (rating > 8.0) { ratingText = "Exceptional" } else if (rating > 7.0) { ratingText = "Great" } else if (rating > 6.0) { ratingText = "Enjoyable" } else if (rating > 5.0) { ratingText = "Unpleasant" } else { ratingText = "Horrible" }  
        $("#movie-language").append("<p>" + rating + " (" + ratingText + ")</p>");

        //Info picture
        var infoImgPath = data.backdrop_path;
        var infoImg = baseURL_infoImg + infoImgPath;
        $("#infoImgWrapper").append("<img id='infoImg' src=" + infoImg + ">");

        //Description
        var description = data.overview;
        $("#descriptionWrapper").append("<textarea id='description'>" + description + "</textarea>");
    });
}
