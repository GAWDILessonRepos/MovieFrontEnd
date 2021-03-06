/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.createReview = function(event){
  var id = MovieApp.getParams();
  event.preventDefault();
  var stars = 0;
  if ($('#reviewStars').val() !== 0){
    stars = $('#reviewStars').val();
  }


  $.ajax({
    url: MovieApp.url + '/movies/' + id + '/reviews',
    type: 'POST',
    data: {
      review: {
        comment: $('textarea#reviewComment').val(),
        stars: stars,
        reviewer: $('input#reviewReviewer').val()
      }
    }
  }).done(function(){
    MovieApp.showReviews();
  }).fail();
};

MovieApp.showReviews = function(){
  location.reload();
};

$(document).ready(function(){
  console.log('review_new loaded');
  $('#reviewForm').submit(MovieApp.createReview);
});
