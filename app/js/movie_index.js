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
  if (window.location.search){
    var page = MovieApp.getParams();
  } else {
    var page = 1;
  }
  var start = (page-1) * 3;
  var end = page * 3;
  if (movies.length < end) {
    end = movies.length
  }
  for (var i = start; i < end; i++){
    MovieApp.renderMovie(movies[i]);
  }
  MovieApp.renderPageButtons();
  if (movies.length === end) {
    $('#next').remove();
  }
};

MovieApp.renderPageButtons = function(){
  if (window.location.search &&MovieApp.getParams() === '1'){
    $('#movieIndex').append('<a id=prev href='+'http://localhost:9000'+'> << </a>');
    $('#movieIndex').append('<h4>Page 1</h4>')
    $('#movieIndex').append('<a id=next href=/?page=3> >> </a>');
  } else if (window.location.search){
    var page = Number(MovieApp.getParams());
    var next = page + 1;
    var prev = page - 1;
    $('#movieIndex').append('<a id=prev href=/?page='+ prev +'> << </a>');
    $('#movieIndex').append('<a id=next href=/?page='+ next +'> >> </a>');
  } else {
    $('#movieIndex').append('<a id= next href=/?page=2> >> </a>');
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
