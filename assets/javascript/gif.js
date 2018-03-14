$( document ).ready(function() {

var topics = ["Harry Potter", "Ron Weasley", "Hermione Granger", "Lord Voldermort", "Draco Malfoy",
    "Albus Dumbledore", "Severus Snape"
]

function renderButtons() {


    $("#buttons-view").empty();


    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");

        a.addClass("gif-btn");

        a.attr("data-name", topics[i]);

        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();

    var gifInput = $("#gif-input").val().trim();

    topics.push(gifInput);

    $("#gif-input").val("")
    renderButtons();


});

renderButtons();

$(document.body).on("click", ".gif-btn", function () {
    console.log(this);
    var harryPotter = $(this).attr("data-name");


    var queryURL = "https://api.giphy.com/v1/gifs/search?" +
        "api_key=QqAT80q1iqn6a6N232lBJvRK9I7zNL9J" + "&q=" + harryPotter +
        "&limit=10&offset=0&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        $("#gifs-appear-here").empty();

        for (var i = 0; i < results.length; i++) {
            var hpDiv = $("<div class=harry>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var harryPotterImage = $("<img>").attr("src", results[i].images.fixed_height.url);
            harryPotterImage.attr("data-animate", results[i].images.fixed_height.url);
            harryPotterImage.attr("data-still", results[i].images.fixed_height_still.url);
            harryPotterImage.attr("data-state", "still");
            harryPotterImage.addClass("image");

            hpDiv.append(p);
            hpDiv.append(harryPotterImage);
            $("#gifs-appear-here").append(hpDiv);
        }
    });
});

$(document).on("click", "img", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");


    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }

});
})