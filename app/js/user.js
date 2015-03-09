/*global $:false */
'use strict';

var MovieApp = MovieApp || {
    url: 'http://localhost:3000'
};

MovieApp.authToken = '';


MovieApp.run = function(){

  MovieApp.authToken = localStorage.getItem('authToken');

  MovieApp.setupAjaxRequests();

  $('#signIn').on('submit', MovieApp.signIn);
  $('#signUp').on('submit', MovieApp.signUp);
};

MovieApp.signUp = function (){
  event.preventDefault();

  $.ajax({
    url: MovieApp.url + '/users',
    type: 'POST',
    data: { user: {
      name: $('#signUpName').val(),
      email: $('#signUpEmail').val(),
      password: $('#signUpPassword').val()
    }}
  }).done(MovieApp.loginSuccess).fail(function(err){
    console.log(err);
  });

  return false;
};

MovieApp.loginSuccess = function(userData){
  localStorage.setItem('authToken', userData.token);
  window.location.href = '/';
};

MovieApp.signIn = function(){
  event.preventDefault();

  $.ajax({
    url: MovieApp.url + '/users/sign_in',
    type: 'POST',
    data: {user:{
      name: $('#signInName').val(),
      password: $('#signInPassword').val()
    }}
  }).done(MovieApp.loginSuccess).fail(function(err){
    console.log(err);
  });

  return false;
};

MovieApp.setupAjaxRequests = function(){
  $.ajaxPrefilter(function(options){
    options.headers = {};
    options.headers['AUTHORIZATION'] = "Token token=" + MovieApp.authToken;
  });
};

$(document).ready(function(){
  MovieApp.run();
});


