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
	console.log(MovieApp.url + '/movies/' + id);
	// $.ajax({
	// 	url: MovieApp.url + '/movies/' + id,
	// 	type: 'GET'
	// }).done(function(data){
	// 	console.log(data);
	// }).fail(function(jqXHR, textStatus, errorThrown){
	// 	console.log('error!!!');
	// });
};

$(document).ready(function(){
  console.log('movie_show loaded');
  MovieApp.getMovie();
});
