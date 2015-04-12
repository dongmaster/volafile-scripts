// ==UserScript==
// @name        Volafile ip address hider
// @namespace   volafile.ip.hider
// @description Hides ip addresses for mods.
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==



var names = document.getElementsByClassName("username");
var files = document.getElementsByClassName("tag_key_ip");
var hiding_ip_addresses = false;

function init() {
  add_shitposting_button("IP", toggle_ip_addresses_simple);
}

function add_shitposting_button(text, func) {
  var button = document.createElement("SPAN");
  var button_text = document.createTextNode(text);

  button.appendChild(button_text);
  button.addEventListener("click", func, true);
  button.style = "user-select: none; -moz-user-select: none; margin-left: 5px;";
  button.setAttribute("id", "");

  document.getElementById('chat_hbar').appendChild(button)

  //document.getElementById('chat_name_container').insertBefore(button, document.getElementById('chat_name_container').parentNode.childNodes[0])
}

function toggle_ip_addresses_simple() {
  switch(hiding_ip_addresses) {
    case false:
      toggle_ip_addresses("none");
      break;
    case true:
      toggle_ip_addresses("inline");
      break;
  }
}


// Takes values related to the display CSS option/paramater/something. block, inline, none, that kind of stuff.
function toggle_ip_addresses(input) {
  names = document.getElementsByClassName("username");
  files = document.getElementsByClassName("tag_key_ip");
  
  if(input === "none") {
    hiding_ip_addresses = true;
  } else if(input === "inline") {
    hiding_ip_addresses = false;
  }
  
  
  for(var i = 0; i < names.length; i++) {
    var spans = names[i].getElementsByTagName("span");
    var ip_address = "";

    for(var j = 0; j < spans.length; j++) {
      if(/(\(|\))/.test(spans[j].textContent)) {
        ip_address = spans[j];

        ip_address.style.display = input;
      }
    }
  }
  
  for(var i = 0; i < files.length; i++) {
    files[i].style.display = input;
  }
}

var target_chat = document.querySelector('#chat_messages');
var target_file = document.querySelector('#file_list');

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
    
    if(hiding_ip_addresses === true) {
      // Hides ip addresses in chat
      names = document.getElementsByClassName("username");
      
      var name = document.getElementsByClassName("username");
      
      var spans = name[name.length - 1].getElementsByTagName("span");
      var ip_address = "";

      for(var j = 0; j < spans.length; j++) {
        if(/(\(|\))/.test(spans[j].textContent)) {
          ip_address = spans[j];

          ip_address.style.display = "none";
        }
      }
    }
	});
});

var observer_files = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
    
    if(hiding_ip_addresses === true) {
      files = document.getElementsByClassName("tag_key_ip");
      files[0].style.display = "none";
    }
	});
});

var config = {
	childList: true
};

observer.observe(target_chat, config);
observer_files.observe(target_file, config);

toggle_ip_addresses("inline");

(function() {
    var state = document.readyState;
    if(state === 'interactive' || state === 'complete') {
        init();
    }
    else setTimeout(arguments.callee, 100);
})();