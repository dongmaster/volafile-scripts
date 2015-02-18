// ==UserScript==
// @name        Volafile last highlight
// @namespace   volafile.last.highlight
// @description Takes you to the last highlight
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

function init() {
  var chat = document.getElementById("chat_input");
  
  function add_lazy_button(text, func) {
    var button = document.createElement("SPAN");
    var button_text = document.createTextNode(text);

    button.appendChild(button_text);
    button.addEventListener("click", func, true);
    button.style = "user-select: none; -moz-user-select: none; margin-left: 5px;";
    button.setAttribute("id", "admin_chat_toggle");

    document.getElementById('chat_hbar').appendChild(button)

    //document.getElementById('chat_name_container').insertBefore(button, document.getElementById('chat_name_container').parentNode.childNodes[0])
  }
  
  function go_to_last_highlight() {
    var elems = document.getElementsByClassName("highlight");
    console.log(elems);
  
    elems[elems.length - 1].id = "iamalazyfucker"
    window.location.hash = "iamalazyfucker"
    elems[elems.length - 1].id = "";
  }
  
  add_lazy_button("LH", go_to_last_highlight);
}

(function() {
    var state = document.readyState;
    if(state === 'interactive' || state === 'complete') {
        init();
    }
    else setTimeout(arguments.callee, 100);
})();