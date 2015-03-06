/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http:localhost:3000'
};

MovieApp.createMovie = function(event){
  if (event.preventDefault) event.preventDefault();
  $.ajax({
    url: MovieApp.url + '/movies',
    type: 'POST',
    data: {
      movie: {
        title: $('input#movieTitle').val(),
        gross: $('input#movieGross').val(),
        release: $('input#movieRelease').val(),
        rating: $('input#movierating').val(),
        description: $('textarea#movieDescription').val()
      }
    }
  }).done(function(data){
    MovieApp.resetMovieForm();
    MovieApp.goToMovie(data);
  }).fail();
};

MovieApp.resetMovieForm = function(){
  $('input#movieTitle').val('');
  $('input#movieGross').val('');
  $('input#movieRelease').val('');
  $('input#movieRating').val('');
  $('textArea#movieDescription').val('');
};

MovieApp.goToMovie = function(data){
  console.log(data);
};

$(document).ready(function(){
  // window.location.href = 'http://www.google.com';
  console.log('movie_new loaded');
  $('#movieForm').submit(MovieApp.createMovie);
});
