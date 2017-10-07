// ==UserScript==
// @name        Volafile chat timestamps
// @namespace   volafile.chat.timestamps
// @description Adds timestamps to chat messages on Volafile.
// @match       https://volafile.org/r/*
// @include     https://volafile.org/r/*
// @version     8
// ==/UserScript==

/*
 *	@Author: Dongmaster
 *	@Author: lg188
 *
 *	Changelog:
 *	Version 1:
 *		Basic script
 *	Version 2:
 *		Cleaned out the script
 *	Version 3:
 *		Fixed the duplication bug
 * 	Version 4:
 *  		Fixed hours not having a 0 (zero) behind them if the hour is 9 or below.
 * 	Version 5:
 * 		Fixed moderators not being able to bring up the ban menu by clicking an IP.
 *  Version 6:
 *    Added a class to the timestamp (userscript_chat_timestamp).
 *  Version 7:
 *    Re-wrote the script.
 **/

var target = document.querySelector('#chat_messages');

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
        var messages = mutation.addedNodes;
        
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].hasAttribute("data-timestamp") === false) {
                timestamp(messages[i]);
            }
        }
	});
});

var config = {
	childList: true
};

observer.observe(target, config);

function create_element(elem, text) {
    var uelem = document.createElement(elem);
    var uelem_text = document.createTextNode(text);
    
    uelem.appendChild(uelem_text);
    
    return uelem;
}

function timestamp(message) {
    var date = new Date();
    
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    if (hours <= 9) {
        hours = "0" + hours;
    }
    
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    
    var time = hours + ":" + minutes + ":" + seconds + " | ";
    
    var timestamp_element = create_element("SPAN", time);
    timestamp_element.setAttribute("class", "userscript_chat_timestamp");
    
    var username = message.getElementsByClassName("username")[0];
    username.insertBefore(timestamp_element, username.childNodes[0]);
    
    message.setAttribute("data-timestamp", "true");
}
