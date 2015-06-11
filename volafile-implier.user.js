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
    var message = mutation.addedNodes[0];
    var word = message.getElementsByClassName("chat_text")[0].innerHTML.split(" ")[0];
    
    console.log(word);
    if(/&gt;/.test(word)) {
      //message.style.color = "#8fb42e";
      message.style.color = "#99c527";
    }
    
	});
});

var config = {
	childList: true
};

observer.observe(target_chat, config);