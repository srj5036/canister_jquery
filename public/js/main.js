$(document).ready(function(){

	// GET request to retrieve all movies
	$.get("/movies", function(data){
		displayMovieList(data);
	});

	$('#search_button').click(function(e){
		var text_field = $('#movie_name');
		var movie_name = text_field.val();

		e.preventDefault();

		if (movie_name != "") {

			// GET request to search for movie title
			$.get("/search", { q : movie_name }, function(data){
				displaySearchResults(data);
			});

			// Clear the text field
			text_field.val("");
		}
	});

	$('#movie_list').on("mouseenter", '#search_result_item', function() {
		$(this).append('<button class="btn btn-success" id="add_button">Save</button>');
	});

	$('#movie_list').on("mouseleave", '#search_result_item', function() {
		$(this).children("#add_button").remove();
	});

	$('#movie_list').on("mouseenter", '#movie_list_item', function() {
		$(this).append('<button class="btn btn-danger" id="remove_button">Delete</button>');
	});

	$('#movie_list').on("mouseleave", '#movie_list_item', function() {
		$(this).children("#remove_button").remove();
	});

	$('#movie_list').on("click", '#add_button', function() {
		$.post("/movie", { "id" : "248007565" });
	});

	$('#movie_list').on("click", '#remove_button', function() {
		$(this).parent().remove();
	});
});

var displayMovieList = function(movies) {
	var movie_list = $('#movie_list');
	var list_element;

	// Clear out previous search results
	movie_list.html("");

	// Add all movies to the DOM
	$.each(movies, function(index, movie) {
		list_element = '<div class="col-md-2" id="movie_list_item" style="text-align: center;"><h5>' + movie.title + '</h5>' + '<img src="' + movie.posters.detailed + '" /></div>';
		movie_list.append(list_element);
	});
}

var displaySearchResults = function(movies) {
	var movie_list = $('#movie_list');
	var list_element;

	// Clear out previous search results
	movie_list.html("");

	// Add all movies to the DOM
	$.each(movies, function(index, movie) {
		list_element = '<div class="col-md-2" id="search_result_item" style="text-align: center;"><h5>' + movie.title + '</h5>' + '<img src="' + movie.posters.detailed + '" /></div>';
		movie_list.append(list_element);
	});
}