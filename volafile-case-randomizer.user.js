// ==UserScript==
// @name        Volafile Case Randomizer
// @namespace   volafile.case.randomizer
// @description Changes the casing in your name everytime someone says something. Feel free to come up with a better system for when the name changes the casing.
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

function id(input) {
  return document.getElementById(input);
}

function randnum(max) {
  return Math.floor(Math.random() * max + 1);
}

var chat_name = id('chat_name').value.split('');
var name_length = chat_name.length;
var randselector = randnum(2);

function randomize_casing() {
  chat_name = id('chat_name').value.split('');
  for(var i = 0; i < name_length; i++) {
    if(randselector === 1) {
      chat_name[i] = chat_name[i].toLowerCase();
    }

    if(randselector === 2) {
      chat_name[i] = chat_name[i].toUpperCase();
    }

    randselector = randnum(2);
  }

  chat_name = chat_name.join("");

  id('chat_name').value = chat_name;
}

var observer = new MutationObserver(function(mutations){
  randomize_casing();
});

observer.observe(document.querySelector('#chat_messages'), {childList: true});