var movieContent = ["Toy Story", "A Bug's Life", "Toy Story 2", "Monsters Inc.", "Finding Nemo", "The Incredibles", "Pixar Cars", "Ratatouille", "WALL-E", "Up", ];
function showButtons () {
    $("#buttonItems").empty();
    $("#movie").val("");
    for (var i = 0; i < movieContent.length; i++) {
        var button = $("<button class='btn btn-primary'>");
        button.addClass("movie");
        button.attr("movie-title", movieContent[i]);
        button.text(movieContent[i]);
        $("#buttonItems").append(button);
        $("#buttonItems").append(" ");
    }
}



showButtons();
$("#addFilm").on("click", function(event) {
    $("#movieBox").empty();
    event.preventDefault();
    var movieInput = $("#movie").val().trim();
    var movieTerm = $(this).attr("movie-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieInput + "&limit=2&api_key=dc6zaTOxFJmzC";
        $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        if (response.pagination.total_count >= 10) {
            movieContent.push(movieInput);
            showButtons(); }
        else if (response.pagination.total_count === 0) {
            $("#movieBox").html(" Please enter a valid movie title "); }
        $("#movie").val("");
        });
});




$(document).on("click", ".movie", display);
function display() {
	var movieTerm = $(this).attr("movie-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieTerm + "&limit=10&api_key=dc6zaTOxFJmzC";
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
    	for (var j = 0; j < response.data.length; j++) {
		var still = response.data[j].images.fixed_width_still.url;
        var active = response.data[j].images.fixed_width.url;
        var rating = "Rating: " + (response.data[j].rating);
        var movieImg = $("<img>");
        var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
        $(ratingDiv).css({"text-align":"center", "font-size":"20px", "width":"200", "display":"block"
    });
        movieImg.attr({"active":active, "still":still, "src":still, "state":"still"
    });




        var ratingAndImage = $("<div>");
        $(ratingAndImage).css({"float":"left"});
        $(ratingAndImage).prepend(ratingDiv, movieImg);
        $("#rating").prepend(ratingAndImage);
        $(movieImg).on("click", function(event) {
              
                var state = $(this).attr("state");
                var source = $(this).attr("src");
                if (state === "still") {
                $(this).attr("src", $(this).attr("active"));
                $(this).attr("state", "active"); }
                else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("state", "still"); } 
            });
        }
   });
}