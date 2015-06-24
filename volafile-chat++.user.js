// ==UserScript==
// @name        Volafile chat++
// @namespace   volafile.chatplusplus
// @description Adds chat commands to volafile. Command list: /rev
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==
//My code starts at line 85

/*! https://mths.be/esrever v<%= version %> by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var regexSymbolWithCombiningMarks = /(<%= allExceptCombiningMarks %>)(<%= combiningMarks %>+)/g;
	var regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

	var reverse = function(string) {
		// Step 1: deal with combining marks and astral symbols (surrogate pairs)
		string = string
			// Swap symbols with their combining marks so the combining marks go first
			.replace(regexSymbolWithCombiningMarks, function($0, $1, $2) {
				// Reverse the combining marks so they will end up in the same order
				// later on (after another round of reversing)
				return reverse($2) + $1;
			})
			// Swap high and low surrogates so the low surrogates go first
			.replace(regexSurrogatePair, '$2$1');
		// Step 2: reverse the code units in the string
		var result = '';
		var index = string.length;
		while (index--) {
			result += string.charAt(index);
		}
		return result;
	};

	/*--------------------------------------------------------------------------*/

	var esrever = {
		'version': '<%= version %>',
		'reverse': reverse
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return esrever;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = esrever;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in esrever) {
				esrever.hasOwnProperty(key) && (freeExports[key] = esrever[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.esrever = esrever;
	}

}(this));

function notify(message) {
    var notification = document.createElement('DIV');
    var notification_message_container = document.createElement('SPAN');
    var notification_username_container = document.createElement('A');
    
    var notification_username = document.createTextNode('System:');
    var notification_message = document.createTextNode(message);
    
    notification.setAttribute("class", "chat_message admin");
    notification_username_container.setAttribute("class", "username");
    
    notification_message_container.appendChild(notification_message);
    notification_username_container.appendChild(notification_username);
    
    notification.appendChild(notification_username_container);
    notification.appendChild(notification_message_container);
    
    document.getElementById('chat_messages').appendChild(notification);
  
    document.getElementById('chat_messages').scrollTop = document.getElementById('chat_messages').scrollTop + 30;
  }

var chat = document.getElementById('chat_input');

chat.addEventListener("keydown", function(e) {
  if(e.keyCode === 13) {
    modify_message();
  }
}, true);

function modify_message() {
  var message = chat.value;
  var split = message.split(" ");
  
  if (split[0] === "/rev") {
    var new_message = esrever.reverse(message.substring(4, message.length));
    
    chat.value = new_message;
  }
	
	if (split[0] === "/up") {
		var new_message = message.substring(4, message.length).toUpperCase();
		
		chat.value = new_message;
	}
	
	if (split[0] === "/down") {
		var new_message = message.substring(4, message.length).toLowerCase();
		
		chat.value = new_message;
	}
}