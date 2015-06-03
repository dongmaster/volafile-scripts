// ==UserScript==
// @name        Volafile Name to Chat
// @namespace   volafile.name.to.chat
// @description Click a name in chat and it will appear in the chat input.
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==
var separator = ", ";







var chat = document.getElementById("chat_input");

var observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
		for(j = 0; j < mutation.addedNodes.length; j++){
			var username_element = mutation.addedNodes[j].children[0];
      
      username_element.href = "javascript:";
      username_element.target = "";
      
      var children = username_element.childNodes;
      
      for(var i = 0; i < children.length; i++) {
        if(children[i].tagName !== "SPAN" && children[i].textContent !== ":") {
          var name = children[i].textContent;
          var name_element = children[i];
        }
      }
      
      username_element.addEventListener("click", function() {
        chat.focus();
        chat.value = name + separator + chat.value;
      }, true);
		}
	});
});

observer.observe(document.querySelector('#chat_messages'), {childList: true});