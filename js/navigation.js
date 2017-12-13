//Index to know which panel the user is in
var navIndex = 0;
var genreIndex = "";

var selected1 = $(".selected1");
var selected2 = $(".selected2");
var selected3 = $(".selected3");


function toggleInfoBar() {
    $("#menu").toggleClass("display-none");
    $("#filmGrid").toggleClass("display-none");
    $("#infoBar").toggleClass("display-none");
    $("#infoBarChevron").toggleClass("display-none");
}

//Function for scrolling up in general (Only used in description)
var scrollUp = function(elementId) {
    var element = document.getElementById(elementId);
    element.scrollTop -= 20;
};

//Function for scrolling down in general (Only used in description)
var scrollDown = function(elementId) {
    var element = document.getElementById(elementId);
    element.scrollTop += 20;
};

//Function for scrolling up in movie grid
var scrollGridUp = function() {
    //Scrolling for a standard TV
    if (screen.width > 1900) {
        $('.grid-column').animate({ scrollTop: '-=385'}, 400);
    }
    else {
        $('.grid-column').animate({ scrollTop: '-=291'}, 400);
    }
};

//Function for scrolling down in movie grid
var scrollGridDown = function() { 
    //Scrolling for a standard TV
    if (screen.width > 1900) {
        $('.grid-column').animate({ scrollTop: '+=385'}, 400);
    }
    else {
        $('.grid-column').animate({ scrollTop: '+=291'}, 400);
    }
};

//Function for scrolling to the top in movie grid
var scrollGridTop = function() {
    $('.grid-column').animate({ scrollTop: 0}, 1000);
};

function chooseGenre() {
    selected1 = $(".selected1");

    $('.selected1').removeClass("selected1-border");
    navIndex = 1;

    genreIndex = selected1.children().attr('id');

    getThumbnails(genreIndex);
}

/* Keyboard navigation */
$(document).keydown(function(e) {
    switch(e.which) {

            //ENTER KEY
        case 13: 

            //Menu
            if(navIndex == 0){
                chooseGenre();
            }

            //Movie grid
            else if(navIndex == 1){
                selected2 = $(".selected2");
                selected3 = $(".selected3");

                var name = selected2.attr('name');
                getMovieInfo();

                toggleInfoBar();

                selected3.removeClass("selected3");
                $("#info-btn1").addClass("selected3");

                navIndex = 2;
            }
            break;


            //LEFT KEY   
        case 37: 

            //Menu
            if(navIndex == 0){
                alert("You can not go more left!");
            }

            //Movie grid
            else if(navIndex == 1){
                selected2 = $(".selected2");
                selected1 = $(".selected1");

                // If user press left from the leftmost column, user go back to the genre menu
                var id = selected2.attr('id');

                if( (id - 1 ) % 5 == 0){
                    //Choose the correct option in menu
                    selected1.addClass("selected1 selected1-border");

                    selected2.removeClass("selected2");
                    scrollGridTop("grid-column");
                    navIndex = 0;
                    break;
                }

                $(".selected2").removeClass("selected2");
                if (selected2.prev().length == 0) {
                    selected2.siblings().last().addClass("selected2");
                } else {
                    selected2.prev().addClass("selected2");
                }
            }

            //Info bar
            else if(navIndex == 2){

                selected3 = $(".selected3");

                /* If user is to the left in info bar, user can go back to movie grid by  pressing left */
                var id = selected3.attr('id');
                if(id == "info-btn1"){

                    toggleInfoBar();

                    navIndex = 1;
                }

                else{
                    $(".selected3").removeClass("selected3");
                    selected3.prev().addClass("selected3");
                }    
            }

            //Description
            else if(navIndex == 3){
                $("#descriptionWrapper").toggleClass("selected4");
                $("#info-btn3").addClass("selected3");
                navIndex = 2;
            }

            break;


            //UP KEY
        case 38:

            //This code block should only work in menu
            if(navIndex == 0){
                var selected = $(".selected1");

                $(".selected1").removeClass("selected1 selected1-border");
                if (selected.prev().length == 0) {
                    selected.siblings().last().addClass("selected1 selected1-border");
                } else {
                    selected.prev().addClass("selected1 selected1-border");
                }

            }

            else if(navIndex == 1){
                selected2 = $(".selected2");
                $(".selected2").removeClass("selected2");

                // If selector at top, deny user to go any further up
                if (selected2.prev().prev().prev().prev().prev().length == 0) {
                    selected2.addClass("selected2");
                } 
                // Default
                else {
                    selected2.prev().prev().prev().prev().prev().addClass("selected2");
                    scrollGridUp("grid-column");
                }
            }

            //Description
            else if(navIndex == 3){                            
                scrollUp("description");
            }

            break;

            //RIGHT KEY    
        case 39:

            //Menu
            if(navIndex == 0){
                chooseGenre();
            }

            //Movie grid
            else if(navIndex == 1){
                selected2 = $('.selected2');

                // If user press right from the right column, right click stops
                var id = selected2.next().attr('id');

                if( (id - 1) % 5  == 0){

                    selected2.addClass("selected2");
                    break;
                }

                selected2 = $(".selected2");
                $(".selected2").removeClass("selected2");                            
                if (selected2.next().length == 0) {
                    selected2.addClass("selected2");
                } else {
                    selected2.next().addClass("selected2");
                }
            }

            //Info bar
            else if(navIndex == 2){

                selected3 = $(".selected3");

                /* If user is to the left in info bar, user can go back to movie grid by  pressing left */
                var id = selected3.attr('id');
                if(id == "info-btn3"){

                    $("#descriptionWrapper").toggleClass("selected4");
                    $(".selected3").removeClass("selected3");
                    navIndex = 3;
                }

                else {
                    $(".selected3").removeClass("selected3");
                    selected3.next().addClass("selected3");
                }
            }

            break;


            //DOWN KEY    
        case 40:

            //Menu
            if(navIndex == 0){
                var selected = $(".selected1");

                $(".selected1").removeClass("selected1 selected1-border");
                if (selected.next().length == 0) {
                    selected.siblings().first().addClass("selected1 selected1-border");
                } else {
                    selected.next().addClass("selected1 selected1-border");
                }
            }

            //Movie grid
            else if(navIndex == 1){

                selected2 = $(".selected2");
                $(".selected2").removeClass("selected2");

                // If selector at bottom, deny user to go any further down
                if (selected2.next().next().next().next().next().length == 0) {
                    selected2.addClass("selected2");
                } 
                // Default
                else {
                    selected2.next().next().next().next().next().addClass("selected2");
                    scrollGridDown("grid-column");
                }
            }

            //Description
            else if(navIndex == 3){                            
                scrollDown("description");
            }

            break;

            //BACK (b)
        case 66:  

            //Movie grid
            if(navIndex == 1){
                //Choose the correct option in menu
                selected2 = $(".selected2");
                selected1 = $(".selected1");

                scrollGridTop("grid-column");
                selected1.addClass("selected1 selected1-border");
                selected2.removeClass("selected2");
                navIndex = 0;
                break;
            }

            //Info bar
            else if(navIndex == 2){
                toggleInfoBar();
                navIndex = 1;
            }

            //Description
            else if(navIndex == 3){
                $("#descriptionWrapper").toggleClass("selected4");
                $("#info-btn3").addClass("selected3");
                toggleInfoBar();
                navIndex = 1;
            }

            break;

        default: return; // exit this handler for other keys
                  }

    e.preventDefault(); // prevent the default action
});