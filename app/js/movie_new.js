/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.createMovie = function(event){
  if (event.preventDefault) {
    event.preventDefault();
  }

  $.ajax({
    url: MovieApp.url + '/movies/',
    type: 'POST',
    data: {
      movie: {
        title: $('input#movieTitle').val(),
        gross: $('input#movieGross').val(),
        release: $('input#movieRelease').val(),
        rating: $('#movieRating').val(),
        description: $('textarea#movieDescription').val()
      }
    }
  }).done(function(data){
    console.log(data);
    MovieApp.goToMovie(data);
  }).fail();
};

MovieApp.goToMovie = function(data){
  window.location.href = '/show.html?movie=' + data.id;

};

$(document).ready(function(){
  MovieApp.setupAjaxRequests();

  console.log('movie_new loaded');
  $('#movieForm').submit(MovieApp.createMovie);
});
