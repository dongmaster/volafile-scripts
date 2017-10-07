// ==UserScript==
// @name        Volafile chat history
// @namespace   volafile.chat.history
// @description Cycles through everything you've said with the up and down arrow.
// @include     https://volafile.org/r/*
// @version     4
// @grant       none
// ==/UserScript==

var messages = [];
var index = 0;
var set_message = true;

var chat = document.getElementById("chat_input");

chat.addEventListener("keydown", function(e) {
  // If user presses enter
  if(e.keyCode === 13) {
    if(chat.value !== "") {
      messages.push(chat.value);
    }
    
    index = messages.length;
  }
  
  if(e.keyCode === 38 && messages.length > 0) {
    // Up arrow
    if(index - 1 > -1) {
      index--;
    }
    
    chat.value = messages[index];
  } else if(e.keyCode === 40 && messages.length > 0) {
    // Down arrow
    set_message = true;
    if(index + 1 < messages.length) {
      index++;
    } else {
      chat.value = "";
      index = messages.length;
      set_message = false;
    }
    
    if(set_message === true) {
      chat.value = messages[index];
    }
  }
}, true)
