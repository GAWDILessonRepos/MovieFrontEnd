/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.editMovie = function(event){
  if (event.preventDefault) {
    event.preventDefault();
  }

  var id = MovieApp.getParams();

  $.ajax({
    url: MovieApp.url + '/movies/' + id,
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
    MovieApp.goToMovie(data);
  }).fail();
};

MovieApp.goToMovie = function(data){
  window.location.href = '/show.html?movie=' + data.id;

};

$(document).ready(function(){
  console.log('movie_new loaded');
  $('#movieForm').submit(MovieApp.createMovie);
});
