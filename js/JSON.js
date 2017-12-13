var genreChosen = "";
var baseUrl = "http://jscase.dev2.sixty.no";
var indexPath = "/api/index.json";

var uriArray = [];
var uriPath = "";

var genreTitleArray = [];


//Load movie thumbnails from database
function loadThumbnails(data) {
    //First clear the grid
    $("#grid-column").children("img").remove();

    //Push each movie to the array
    var arraySize = data.assets.asset.length;
    for(var i = 1; i <= arraySize; i++){

        //Get thumbnail from url
        var imageURLs = data.assets.asset[i].metadata['image-urls'].$;
        console.log(imageURLs);
        var temp = new Array();
        // this will return an array with strings "url1", "url2", etc.
        temp = imageURLs.split(",");
        var thumbnail = temp[0];

        $("#grid-column").append("<img id=" + i + " src=" + thumbnail + ">");
        $("#1").toggleClass("selected2");
    }
}

//Appending different information in infobar
function appendInfo(data){
    //Get id of movie clicked
    var movieClicked = selected2.attr('id');

    //Title
    var title = data.assets.asset[movieClicked].metadata.title[1].$;
    var year = data.assets.asset[movieClicked].metadata['production-year'].$;
    $("#movie-title").append("<h1 class='display-4 mb-2'>" + title + " (" + year + ")</h1>");

    //Length
    var length = data.assets.asset[movieClicked].metadata['asset-length'].$;
    var hours = parseInt(length / 60);
    var min = parseInt(length % 60);
    $("#movie-length").append("<p>" + hours + " t " + min + " min </p>");

    //Country
    var countries = data.assets.asset[movieClicked].metadata['production-country'].$;
    //Show only the main country
    var tempCountryArray = new Array();
    tempCountryArray = countries.split(",");
    var country = tempCountryArray[0];
    $("#movie-country").append("<p>" + country + "</p>");

    //Language
    var languages = data.assets.asset[movieClicked].metadata['spoken-languages'].$;
    //Show only the main language
    var tempLanguageArray = new Array();
    tempLanguageArray = languages.split(",");
    var language = tempLanguageArray[0];
    $("#movie-language").append("<p>" + language + "</p>");

    //Info picture
    var imageURLs = data.assets.asset[movieClicked].metadata['image-urls'].$;
    var tempImgArray = new Array();
    // this will return an array with separated urls
    tempImgArray = imageURLs.split(",");
    var infoImg = tempImgArray[2];
    $("#infoImgWrapper").append("<img id='infoImg' src=" + infoImg + ">");

    //Description
    var description = data.assets.asset[movieClicked].metadata.synopsis[3].$;
    $("#descriptionWrapper").append("<textarea id='description'>" + description + "</textarea>");
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

//Load genres
$.getJSON( baseUrl + indexPath, function( data ) {
    var genres = [];
    var arraySize = data.contentPanelElements.contentPanelElement.length;

    //Push each genre to the array
    for(var i = 0; i < arraySize; i++){

        var genreTitle = data.contentPanelElements.contentPanelElement[i].title;
        //Only first item should have the class 'selected1'
        if(i == 0){
            genres.push( "<li class='selected1 selected1-border'><a id=genreIndex-" + i + " href='#'>" + genreTitle + "</a></li>" );
        } else {
            genres.push( "<li><a id=genreIndex-" + i + " href='#'>" + genreTitle + "</a></li>" );
        }

        //Push all uri paths and title to arrays
        uriArray.push(data.contentPanelElements.contentPanelElement[i]['@uri']);
        genreTitleArray.push(data.contentPanelElements.contentPanelElement[i].title);
    }

    //Append array to div
    $( "<ul/>", {
        "class": "nav navbar-nav",
        html: genres.join( "" )
    }).appendTo( "nav" );
});

//Get thumbnails from the respective genre
function getThumbnails(index) {

    var genreIndex = index.split("-")[1];
    uriPath = uriArray[genreIndex];
    genreChosen = genreTitleArray[genreIndex];

    $.getJSON( baseUrl + uriPath, function( data ) {
        genreChosen = "action";
        loadThumbnails(data);
    });
}

//Get info about the choosen movie
function getMovieInfo() {

    clearInfoFields();

    $.getJSON( baseUrl + uriPath, function( data ) {
        appendInfo(data);
    });
}