/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.getParams = function(){
	var params = window.location.search;
	var re = /\d/;
	return re.exec(params).join('');
};

MovieApp.getMovie = function(){
	var id = MovieApp.getParams();
	$.ajax({
		url: MovieApp.url + '/movies/' + id,
		type: 'GET'
	}).done(function(data){
		MovieApp.renderHTML(data);
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log(jqXHR, textStatus, errorThrown);
	});
};

MovieApp.getAverage = function(movie){
	if (movie.reviews) {
		var sum = movie.reviews.reduce(function(count, review) {return count + review.stars; }, 0);
		var withStars = movie.reviews.reduce(function(count, review){
			if (review.stars){
				return count + 1;
			} else {
				return count;
			}
		}, 0);
		return (sum/withStars).toFixed(1);
	} else {
		return 'No reviews yet'
	}
};

MovieApp.renderHTML = function(movie){
	var html = '<div class="fullMovie"><h3 class="movieShowTitle">'+movie.title+'</h3><h4 class="movieShowRating">'+movie.rating+'</h4><h4 class="movieShowRelease">'+movie.release+ '<h4>Average User Stars: '+MovieApp.getAverage(movie)+'</h4>'       +'</h4><p class="movieShowDescription">'+movie.description+'</p></div>';
		if (movie.reviews){
			for (var i=0; i<movie.reviews.length; i++){
				html += '<div class="movieReviews"><p class="reviewShowReviewer">'+movie.reviews[i].reviewer+'</p><p class="reviewShowStars">'+movie.reviews[i].stars+'</p><p class="reviewShowComment">'+movie.reviews[i].comment+'</p></div>';
			}
		}

	$('#movieShow').html(html);
	$('#editBtn').on('click', function(event){
		MovieApp.renderEditForm(event, movie);
	});
};


$(document).ready(function(){
  console.log('movie_show loaded');
  MovieApp.getMovie();
});
