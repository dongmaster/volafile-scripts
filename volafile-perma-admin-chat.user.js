// ==UserScript==
// @name        Perma admin chat
// @namespace   volafile.admin.chat
// @description Adds a button that toggles admin chat (so you don't have to type /a all the time)
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var chat = document.getElementById('chat_input');
var admin = false;
function init() {
  chat.addEventListener("keydown", function(e) {
    if(e.keyCode === 13 && admin === true) {
      chat.value = "/a " + chat.value;
    }
  }, true);

  function add_shitposting_button(text, func) {
    var button = document.createElement("SPAN");
    var button_text = document.createTextNode(text);

    button.appendChild(button_text);
    button.addEventListener("click", func, true);
    button.style = "user-select: none; -moz-user-select: none; margin-left: 5px;";
    button.setAttribute("id", "admin_chat_toggle");

    document.getElementById('chat_hbar').appendChild(button)

    //document.getElementById('chat_name_container').insertBefore(button, document.getElementById('chat_name_container').parentNode.childNodes[0])
  }
  
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

  function toggle_admin() {
    switch(admin) {
      case true:
        admin = false;
        notify("Disabled permanent admin chat.");
        document.getElementById("admin_chat_toggle").innerHTML = "A|D";
        break;
      case false:
        admin = true;
        notify("Enabled permanent admin chat.");
        document.getElementById("admin_chat_toggle").innerHTML = "A|E";
        break;
    }
  }
  
  add_shitposting_button(" A ", toggle_admin);
}

document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'interactive') {
      //init()
  } else if (state == 'complete') {
    setTimeout(function() {
      init();
    }, 1500);
      
  }
}