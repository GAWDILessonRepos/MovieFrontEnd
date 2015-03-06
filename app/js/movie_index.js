// DS
/*global $:false */
'use strict';

var MovieApp = MovieApp || {
  url: 'http://localhost:3000'
};

MovieApp.createHTML = function(movie){
  var html = '<li><article><h3>Title: <a href="/movies/' + movie.id + '" title="' + movie.title + '">' + movie.title + '</h3></a><h4>Rating: ' + movie.rating + '<p>' + movie.description + '</p><p>Reviews: ' + movie.reviews.length + '</p></article></li>';
  $('ul#movies').append(html);
};

MovieApp.renderMovie = function(movie){
  MovieApp.createHTML(movie);
};

MovieApp.renderMovies = function(movies){
  movies.forEach(MovieApp.renderMovie);
};

MovieApp.showMovies = function(){
  $.get(MovieApp.url, function(data) {
    MovieApp.renderMovies(data);
  });
};

$(document).ready(function(){
  console.log('movie_index loaded');
  MovieApp.showMovies();
});
