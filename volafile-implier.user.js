// ==UserScript==
// @name        Volafile Implier
// @namespace   volafile.implier
// @description Here at volafile we imply implications
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var target_chat = document.querySelector('#chat_messages');

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
    var messages = mutation.addedNodes;
    
    for(var i = 0; i < messages.length; i++) {
      colorize(messages[i]);
    }
	});
});

var config = {
	childList: true
};

observer.observe(target_chat, config);

function colorize(message_container) {
  var message_parts = message_container.getElementsByClassName("chat_text");
  
  for(var i = 0; i < message_parts.length; i++) {
    var word = message_parts[i].innerHTML.split(" ")[0];

    if(word.slice(0, 4) === "&gt;") {
      message_parts[i].style.color = "#99c527";
    }
  }
}