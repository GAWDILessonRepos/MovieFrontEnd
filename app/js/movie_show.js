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
		console.log('error!!!');
	});
};

MovieApp.renderHTML = function(movie){
	var html = '<div class="fullMovie"><h3 class="movieShowTitle">'+movie.title+'</h3><h4 class="movieShowRating">'+movie.rating+'</h4><h4 class="movieShowRelease">'+movie.release+'</h4><p class="movieShowDescription">'+movie.description+'</p></div>';
		for (var i=0; i<movie.reviews.length; i++){
		html += '<div class="movieReviews"><p class="reviewShowReviewer">'+movie.reviews[i].reviewer+'</p><p class="reviewShowStars">'+movie.reviews[i].stars+'</p><p class="reviewShowComment">'+movie.reviews[i].comment+'</p></div>';
		}
	$('#movieShow').html(html);	
};

$(document).ready(function(){
  console.log('movie_show loaded');
  MovieApp.getMovie();
});
