// ==UserScript==
// @name        Volafile highlight++
// @namespace   volafile.highlight
// @description Highlights messages depending on user-defined words.
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

// Edit this!
var words = [/dong/i, /mod/i];
/* The format is like this:
** /word/i
**
** Example:
** var words = [/dong/i, /myoc/i, /redux/i];
**
** Notes:
** Don't forget to include a , symbol between every word.
** The power of regex is at the tip of your fingers. /word/i looks for every instance of the word "word" independent on the case, so it would target WORD as well as other combinations.
**/
// Edit this!







var nameNode; 
var messageNode;

var observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
    
    nameNode = document.getElementsByClassName('username');
    nameNodeClasses = nameNode[nameNode.length - 1].parentNode.getAttribute('class');
    messageNode = document.getElementsByClassName('chat_text');
    
    for(var i = 0; i < words.length; i++) {
      if(words[i].test(messageNode[messageNode.length - 1].innerHTML) && !/highlight/.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class'))) {
        nameNode[nameNode.length - 1].parentNode.setAttribute('class', nameNodeClasses + ' highlight');
      }
    }
	});
});

observer.observe(document.querySelector('#chat_messages'), {childList: true});