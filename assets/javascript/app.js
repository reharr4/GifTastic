
var topics = ["Shakira", "Michael Jackson", "Paul Simon", "The Kinks"];

$(document).ready(function () {

   // add on click listener to elements with topic-btn class
   $(document).on("click", ".topic-btn", displayPersonInfo);
    function displayPersonInfo() {

        // button clicked 
        var person = $(this).attr("data-person")

        $(".row").on("click", ".gif", function() {

            var state = $(this).attr("data-state");

            if(state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
        // giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=vVUVgEidbLRXqZbFQj3rwYnqtSXxw0MN&limit=10";

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

                        // create div for gif
                        var gifDiv = $("<div>");

                        // store result rating
                        var rating = results[i].rating;

                        // paragraph to hold the rating
                        var p = $("<p>").text("Rating: " + rating);

                        // element to hold image
                        var personImage = $("<img>")

                        // give image tag src attribute of property pulled from result
                        personImage.attr({
                            'src': results[i].images.fixed_height_still.url,
                            'data-state': "still",
                            'data-animate': results[i].images.fixed_height.url,
                            'data-still': results[i].images.fixed_height_still.url,
                            'class': "gif",
                            'alt': results[i].title
                        });

                        // append gif and rating to div
                        gifDiv.append(personImage);
                        gifDiv.append(p);

                        // add person above previous persons
                        $("#results").prepend(gifDiv);
                    }
                })

            };
    })

    // function to display person data
    function renderButtons() {
        // empty form prior to adding new gifs
        $("#buttons-view").empty();

        // loop through array of GIF
        for (var i = 0; i < topics.length; i++) {
            // generate buttons for each GIF in the array
            var a = $("<button>");
            // add class of GIF to button
            a.addClass("topic-btn");
            // add data-attribute
            a.attr("data-person", topics[i]);
            // button text
            a.text(topics[i]);
            // add button to buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // person button on click function
    $("#add-person").on("click", function (event) {
        // press enter or submit
        event.preventDefault();
        // grab input from textbox
        var tv = $("#person-input").val().trim();

        // add person from textbox to array
        topics.push(tv);

        // call renderButtons to process array
        renderButtons();
    });

    // call renderButtons function to display initial buttons
    renderButtons();
;