/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.getParams = function(){
	var params = window.location.search;
	var re = /\d/;
	return re.exec(params);
};

MovieApp.getMovie = function(){
	var id = getParams();
	$.ajax({
		url: MovieApp.url + '/movies/' + id,
		type: 'GET'
	}).done(function(data){
		console.log(data)
	}).fail(function(jqXHR, textStatus, errorThrown){
		console.log('error!!!')
	});
};

$(document).ready(function(){
  console.log('movie_show loaded');
  MovieApp.getMovie();
});
