/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.renderEditForm = function(event, movie){
	event.preventDefault();
	
	var html = ['<form id="movieEditForm">',
				'<div class="formGroup">',
					'<label for="movieEditTitle">Title</label>', 
					'<input id="movieEditTitle" type="text"/>', 
				'</div>', 
				'<div class="formGroup">',
					'<label for="movieEditGross">Gross</label>', 
					'<input id="movieEditGross" type="text"/>', 
				'</div>',
				'<div class="formGroup">',
					'<label for="movieEditRelease">Release</label>', 
					'<input id="movieEditRelease" type="date"/>', 
				'</div>',
				'<div class="formGroup">',
					'<label for="movieEditRating">Rating</label>', 
					'<input id="movieEditRating" type="text"/>', 
				'</div>',
				'<div class="formGroup">',
					'<label for="movieEditDescription">Description</label>', 
					'<textarea id="movieEditDescription"></textarea>', 
				'</div>',
				'<div class="formGroup">',
                '<input type="submit" id="movieSubmit"/>',
            	'</div>',
			'</form>'].join('');

	$('#movieShow').html(html);
	$('#movieEditTitle').val(movie.title);
	$('#movieEditGross').val(movie.gross);	
	$('#movieEditRelease').val(movie.release);
	$('#movieEditRating').val(movie.rating);
	$('#movieEditDescription').val(movie.description);

	var $editform = $('#movieEditForm');
	$('#movieSubmit').on('click', function(event){
		MovieApp.editMovie(event, $editform);
	});
};

MovieApp.editMovie = function(){
	event.preventDefault();
	var id = MovieApp.getParams();
 	$.ajax({
	    url: MovieApp.url + '/movies/' + id,
	    type: 'PATCH',
	    data: {
	      movie: {
	        title: $('#movieEditTitle').val(),
	        gross: $('#movieEditGross').val(),
	        release: $('#movieEditRelease').val(),
	        rating: $('#movieEditRating').val(),
	        description: $('#movieEditDescription').val()
	      }
	    }
  }).done(function(data){
    MovieApp.renderHTML(data);
  }).fail();
};


$(document).ready(function(){
  console.log('movie_edit loaded');
});
