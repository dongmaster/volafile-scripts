// ==UserScript==
// @name        Volafile chat history
// @namespace   volafile.chat.history
// @description Cycles through everything you've said with the up and down arrow.
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var messages = [];
var index = 0;

var chat = document.getElementById("chat_input");

chat.addEventListener("keydown", function(e) {
  // If user presses enter
  if(e.keyCode === 13) {
    if(chat.value !== "") {
      messages.push(chat.value);
    }
    
    index = messages.length;
  }
  
  if(e.keyCode === 38) {
    // Up arrow
    if(index - 1 > -1) {
      index--;
    } else {
      index = (messages.length - 1);
    }
    
    chat.value = messages[index];
  } else if(e.keyCode === 40) {
    // Down arrow
    if(index + 1 < messages.length) {
      index++;
    } else {
      index = 0;
    }
    
    chat.value = messages[index];
  }
}, true)