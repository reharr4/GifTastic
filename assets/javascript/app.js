
var animals = ["cat", "dog", "horse", "otter"];

$(document).ready(function () {

   // add on click listener to elements with animal-btn class
   $(document).on("click", ".animal-btn", displayAnimalInfo);
    function displayAnimalInfo() {

        var animal = $(this).attr("data-animal");
        // giphy api
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=vVUVgEidbLRXqZbFQj3rwYnqtSXxw0MN&limit=10";

        // ajax call for button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        // create a div to hold the GIF
                        // var animalDIV = $("<div class='animal'>");

                        // store the rating
                        // var rating = response.Rated;

                        // display the rating
                        // animalDIV.append(pOne);

                        // get URL for image
                        // var imgURL = response.Gif;

                        // element to hold image
                        var animalImage = $("<img>")

                        animalImage.attr("src", results[i].images.fixed_height.url);

                        // append gif
                        gifDiv.append(p);
                        gifDiv.append(animalImage);

                        // add animal above previous animals
                        $("#animal-view").prepend(gifDiv);
                    }
                }


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
    $("#add-animal").on("click", function (event) {
        // press enter or submit
        event.preventDefault();
        // grab input from textbox
        var animal = $("#animal-input").val().trim();

        // add animal from textbox to array
        animals.push(animal);

        // call renderButtons to process array
        renderButtons();
    });

 

    // call renderButtons function to display initial buttons
    renderButtons();
});