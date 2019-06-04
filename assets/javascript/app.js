$(document).ready(function () {

var animals = ["cat", "dog", "horse", "otter"];

    function displayAnimalInfo() {

    var animal = $(this).attr("data-animal");
    // giphy api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=vVUVgEidbLRXqZbFQj3rwYnqtSXxw0MN&limit=10";

    // ajax call for button clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // create a div to hold the GIF
        var animalDIV = $("<div class='animal'>");

        // store the rating
        var rating = response.Rated;

        // create element to display rating
        var pOne = $("<p>").text("Rating: " + rating);

        // display the rating
        animalDIV.append(pOne);

        // get URL for image
        var imgURL = response.Gif;

        // element to hold image
        var gif = $("<img>").attr("src", imgURL);

        // append gif
        animalDIV.append(gif);

        // add animal above previous animals
        $("#animal-view").prepend(animalDIV);
    });
    }

    // function to display animal data
    function renderButtons() {
        // empty form prior to adding new gifs
        $("#buttons-view").empty();

        // loop through array of GIF
        for (var i = 0; i < animals.length; i++) {
            // generate buttons for each GIF in the array
            var a = $("<button>");
            // add class of GIF to button
            a.addClass("animal-btn");
            // add data-attribute
            a.attr("data-animal", animals[i]);
            // button text
            a.text(animals[i]);
            // add button to buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // animal button on click function
    $("#add-animal").on("click", function(event) {
        // press enter or submit
        event.preventDefault();
        // grab input from textbox
        var animal = $("#animal-input").val().trim();

        // add animal from textbox to array
        animals.push(animal);

        // call renderButtons to process array
        renderButtons();
    });

    // add on click listener to elements with animal-btn class
    $(document).on("click", ".animal-btn", displayAnimalInfo);

    // call renderButtons function to display initial buttons
    renderButtons();
});