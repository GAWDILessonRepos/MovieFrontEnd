// DS
/*global $:false */
'use strict';

var MovieApp = MovieApp || {
  url: 'http://localhost:3000'
};

MovieApp.createHTML = function(movie){
  var html = '<li><article><h3>Title: <a href="/show.html?movie=' + movie.id + '" title="' + movie.title + '">' + movie.title + '</h3></a><h4>Rating: ' + movie.rating + '<p>' + movie.description + '</p><p>Reviews: ' + movie.reviews.length + '</p></article></li>';
  $('ul#movies').append(html);
};

MovieApp.renderMovie = function(movie){
  MovieApp.createHTML(movie);
};

// MovieApp.renderMovies = function(movies){
//   movies.forEach(MovieApp.renderMovie);
// };

MovieApp.renderSomeMovies = function(movies){
  for (var i = 0; i < 3; i++){
    MovieApp.renderMovie(movies[i]);
  }
  console.log(movies.length);
  if (movies.length > 3){
    MovieApp.renderPageButtons();
  }
};

MovieApp.renderPageButtons = function(){
  if (window.location.search &&MovieApp.getParams() === '1'){
    $('#movieIndex').append('<a href='+'http://localhost:9000'+'> << </a>');
    $('#movieIndex').append('<a href=/?page=2> >> </a>');
  } else if (window.location.search){
    var page = Number(MovieApp.getParams());
    var next = page + 1;
    var prev = page - 1;
    $('#movieIndex').append('<a href=/?page='+ prev +'> << </a>');
    $('#movieIndex').append('<a href=/?page='+ next +'> >> </a>');
  } else {
    $('#movieIndex').append('<a href=/?page=1> >> </a>')
  }
};

MovieApp.showMovies = function(){
  $.get(MovieApp.url, function(data) {
    MovieApp.renderSomeMovies(data);
  });
};

$(document).ready(function(){
  console.log('movie_index loaded');
  MovieApp.showMovies();
});
