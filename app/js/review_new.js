/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.createReview = function(event){
  var id = MovieApp.getParams();
  if (event.preventDefault) {
    event.preventDefault();
  }
  console.log(MovieApp.url + '/movies' + id + '/reviews');
  // $.ajax({
  //   url: MovieApp.url + '/movies' + id + '/reviews',
  //   type: 'POST',
  //   data: {
  //     movie: {
  //       title: $('input#movieTitle').val(),
  //       gross: $('input#movieGross').val(),
  //       release: $('input#movieRelease').val(),
  //       rating: $('input#movierating').val(),
  //       description: $('textarea#movieDescription').val()
  //     }
  //   }
  // }).done(function(data){
  //   MovieApp.goToMovie(data);
  // }).fail();
};

// MovieApp.goToMovie = function(data){
//   window.location.href = '/show.html?movie=' + data.id;
// };

$(document).ready(function(){
  console.log('review_new loaded');
  $('#reviewForm').submit(MovieApp.createReview);
});
