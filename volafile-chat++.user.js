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
  if (e.keyCode === 13) {
    modify_message();
  }
}, true);

function modify_message() {
  var message = chat.value;
  var split = message.split(" ");
  
  if (split[0] === "/rev") {
    var new_message = esrever.reverse(split.slice(1, split.length).join(" "));
    
    chat.value = new_message;
  }
	
	if (split[0] === "/up") {
		var new_message = split.slice(1, split.length).join(" ").toUpperCase();
		
		chat.value = new_message;
	}
	
	if (split[0] === "/down") {
		var new_message = split.slice(1, split.length).join(" ").toLowerCase();
		
		chat.value = new_message;
	}
	
	if (split[0] === "/upload") {
		if (split.length > 1) {
			var text_to_upload = split.slice(2, split.length).join(" ");
			var room_id = window.config.room_id;
			var name = document.getElementById("chat_name").value;
			var filename = split[1];

			chat.value = "";

			upload(room_id, name, text_to_upload, filename);
		} else {
			chat.value = "";
			notify("Usage: /upload filename.txt Your text here");
			notify("Warning! The filename has to be one word!");
		}
	}
}

function upload(room, name, file_content, filename) {
		// Do not criticize this code, myon.
		// This was hacked togehter in like 30 minutes or something and I have no intention of changing it right now.
		
    var aFileParts = [file_content];
    var oMyBlob = new Blob(aFileParts, {type : 'text/plain'}); // the blob

    var upload_key_url = "https://volafile.io/rest/getUploadKey?name=" + name + "&room=" + room;


    function _upload(room, file, key, server, filename) {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
      
        var upload_url = "https://" + server + "/upload?room=" + room + "&key=";
        
        xhr.open("POST", upload_url + key + "&filename=" + filename, true);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Handle response.
                var response = xhr.responseText;

            } else {
              console.log(xhr.responseText);
            }
        };
        
        fd.append("file", file);
        
        xhr.send(fd);
    }



    var xhr = function(u, c, t) {
        var r = new XMLHttpRequest();
        r.onreadystatechange = function() {
            if (r.readyState == 4 && r.status == 200) {
                c(r.response);
            }
        };
        r.open("GET", u, true);
      r.setRequestHeader("Accept", "application/json");
        if (t) {r.responseType = t;}
        r.overrideMimeType('text/plain');
        r.send();
        return r;
    }

    xhr(upload_key_url, lel);

    function lel(benis) {
      var ukey = JSON.parse(benis);
      console.log(ukey.key)
      
      _upload(room, oMyBlob, ukey.key, ukey.server, filename);
    }
}

function notify(message) {
    var notification = document.createElement('DIV');
    var notification_message_container = document.createElement('SPAN');
    var notification_username_container = document.createElement('A');
    
    var notification_username = document.createTextNode('Log:');
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
