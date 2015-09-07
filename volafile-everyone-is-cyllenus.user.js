// ==UserScript==
// @name        Volafile Everyone is Cyllenus
// @namespace   volafile.everyone.is.cyllenus
// @description Everyone is Cyllenus!
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var target_chat = document.querySelector('#chat_messages');

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        var messages = mutation.addedNodes;
        
        for (var i = 0; i < messages.length; i++) {
          var message_parts = messages[i].getElementsByClassName("chat_text");
          
          for (var j = 0; j < message_parts.length; j++) {
            console.log(message_parts[j]);
            message_parts[j].textContent = cyllenus(message_parts[j].textContent);
          }
        }
	});
});

var config = {
	childList: true
};

observer.observe(target_chat, config);

function rand_num(max) {
    return Math.floor(Math.random() * max + 1);
}

function cyllenus(chat) {

		function autism_word(word) {
        // Autisms up a word
        
        var num = rand_num(6);
        var new_word = "";
        
        for (var i = 0; i < word.length; i++) {
            if (num !== 1) {
                if (word.length > 1) {
                    new_word += word[i];
                } else {
                    new_word += word;
                }
            } else {
                if (word.length > 1) {
                    new_word += word[rand_num(word.length - 1)];
                } else {
                    new_word += word;
                }
            }
            
            num = rand_num(6);
        }
        
        return new_word;
    }
	
    function autism() {
        var split = chat.split(" ");
        var new_sentence = [];

        for (var i = 0; i < split.length; i++) {
            new_sentence.push(autism_word(split[i]));
        }

        return new_sentence.slice(0, new_sentence.length).join(" ");
    }

    return autism();
}