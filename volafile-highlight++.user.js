// ==UserScript==
// @name        Volafile highlight++
// @namespace   volafile.highlight
// @description Highlights messages depending on user-defined words.
// @include     https://volafile.org/r/*
// @match       https://volafile.org/r/*
// @version     4
// @grant       none
// ==/UserScript==

// Edit the line below.
var words = [/test/i];
/* The format is like this:
** /word/i
**
** Example:
** var words = [/dong/i, /master/i];
**
** Notes:
** Don't forget to include a , symbol between every word.
** The power of regex is at the tip of your fingers. /word/i looks for every instance of the word "word" independent on the case, so it would target WORD as well as other combinations.
**/

NodeList.prototype.filter = Array.prototype.filter;
NodeList.prototype.map = Array.prototype.map;

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
    var nodes = mutation.addedNodes;

        nodes.forEach(function(node) {
            var text_nodes = node.querySelectorAll(".chat_text");

            words.forEach(function(word) {
                text_nodes.forEach(function(text_node) {
                    if (word.test(text_node.innerText)) {
                        set_highlight(node);
                    }
                });
            });
        });
    });
});

function set_highlight(node) {
  console.log(node)
  node.className = node.className + " highlight";
}

observer.observe(document.querySelector('#chat_messages'), {childList: true});
