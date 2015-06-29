// ==UserScript==
// @name        Volafile Show Filter Buttons
// @namespace   volafile.show.filter.buttons
// @description You don't have to press the Filter Files button anymore
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

(function() {
    var state = document.readyState;
    if(state === 'interactive' || state === 'complete') {
        document.getElementById("show_search_ui").click();
    }
    else setTimeout(arguments.callee, 100);
})();
  

