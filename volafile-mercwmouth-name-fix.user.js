// ==UserScript==
// @name        Volafile MercWMouth Name Fix
// @namespace   volafile.mercwmouth.name.fix
// @description Fixes Merc's name
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var target = document.querySelector('#chat_messages');

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
        var messages = mutation.addedNodes;

        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            var username = message.querySelector(".username");
            //var chat = message.querySelector(".chat_text");
            //var chat_text = chat.textContent;

            //chat_text = chat_text.replace(/mercwmouth/i, "Nigger");

            //chat.textContent = chat_text;
               
            var username_text = username.textContent;
            username_text = username_text.replace(/mercwmouth/i, "Nigger");

            username.textContent = username_text;
        }
	});
});

var config = {
    childList: true
};

observer.observe(target, config);
