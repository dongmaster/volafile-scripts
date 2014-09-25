// ==UserScript==
// @name        Volafile clear chat
// @namespace   volafile.clearchat
// @description Clears every chat message on volafile.
// @include     *://volafile.io/r/*
// @match       *://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

function id(input) {
  return document.getElementById(input);
}

var messages = document.getElementsByClassName('chat_message');

function clear_chat() {
  messages = document.getElementsByClassName('chat_message');
  for(var i = 0; i < messages.length; i++) {
    messages[i].parentNode.removeChild(messages[i]);
  }
}

var switchButton = document.createElement('BUTTON');
var switchButtonText = document.createTextNode('C');
switchButton.setAttribute('id', 'clear_chat_button');
switchButton.setAttribute('class', 'button');
switchButton.style.display = 'inline-block';
switchButton.style.color = '#3A4040';
switchButton.style.marginRight = '0.30em';
switchButton.style.paddingRight = '0.30em';
switchButton.style.paddingLeft = '0.30em';
switchButton.style.border = 'none';
switchButton.addEventListener('click', clear_chat, false);
switchButton.appendChild(switchButtonText);

id('upload_container').appendChild(switchButton);