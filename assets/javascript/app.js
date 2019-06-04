
var topics = ["Powerpuff Girls", "Spongebob Squarepants", "Animaniacs", "Super Jail"];

$(document).ready(function () {

   // add on click listener to elements with cartoon-btn class
   $(document).on("click", ".cartoon-btn", displayCartoonInfo);
    function displayCartoonInfo() {

        // button clicked 
        var cartoon = $(this).attr("data-cartoon");
        // giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            cartoon + "&api_key=vVUVgEidbLRXqZbFQj3rwYnqtSXxw0MN&limit=10";

        // ajax call for button clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // data back from API
            .then(function (response) {

                // store results in array
                var results = response.data;

                // loop through resulting items
                for (var i = 0; i < results.length; i++) {

                    // act if resulting gif has appropriate rating
                    if (results[i].rating !== "r") {

                        // create div for gif
                        var gifDiv = $("<div>");

                        // store result rating
                        var rating = results[i].rating;

                        // paragraph to hold the rating
                        var p = $("<p>").text("Rating: " + rating);

                        // element to hold image
                        var cartoonImage = $("<img>")

                        // give image tag src attribute of property pulled from result
                        cartoonImage.attr("src", results[i].images.fixed_height.url);

                        // append gif and rating to div
                        gifDiv.append(cartoonImage);
                        gifDiv.append(p);

                        // add cartoon above previous cartoons
                        $("#cartoon-view").prepend(gifDiv);
                    }
                }
                $(".gif").on("click", function() {

                    var state = $(this).attr("data-state");

                    if(state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                })

            });
    }

    // function to display cartoon data
    function renderButtons() {
        // empty form prior to adding new gifs
        $("#buttons-view").empty();

        // loop through array of GIF
        for (var i = 0; i < topics.length; i++) {
            // generate buttons for each GIF in the array
            var a = $("<button>");
            // add class of GIF to button
            a.addClass("cartoon-btn");
            // add data-attribute
            a.attr("data-cartoon", topics[i]);
            // button text
            a.text(topics[i]);
            // add button to buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // cartoon button on click function
    $("#add-cartoon").on("click", function (event) {
        // press enter or submit
        event.preventDefault();
        // grab input from textbox
        var tv = $("#cartoon-input").val().trim();

        // add cartoon from textbox to array
        topics.push(tv);

        // call renderButtons to process array
        renderButtons();
    });

 

    // call renderButtons function to display initial buttons
    renderButtons();
});