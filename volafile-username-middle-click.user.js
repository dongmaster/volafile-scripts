// ==UserScript==
// @name        Volafile Username Middle-click
// @namespace   volafile.username.middle.click
// @description Middle-click on names in the file list to open their profile page.
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var target = document.querySelector('#file_list');

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    var messages = mutation.addedNodes;

    for (var i = 0; i < messages.length; i++) {
      apply_event(messages[i].querySelector(".tag_key_user"))
    }
	});
});

var config = {
	childList: true
};

observer.observe(target, config);


function apply_event(element) {

  element.addEventListener("mouseup", function(e){
    if (e.button === 1) {
      e.preventDefault();
      window.open("https://volafile.io/user/" + element.textContent)
    }
  });

}
