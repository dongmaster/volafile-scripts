// ==UserScript==
// @name        Volafile Case Randomizer
// @namespace   volafile.case.randomizer
// @description OPTIONS ARE INSIDE THE SCRIPT, YOU NEED TO EDIT IT TO ENABLE OTHER OPTIONS. Changes the casing in your name everytime someone says something. Feel free to come up with a better system for when the name changes the casing.
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

// OPTIONS
// DO NOT TURN ON SEVERAL AT A TIME
// TO TURN OFF A SETTING, SET IT TO FALSE
var random = true;
var sequence_lower = false;
var sequence_upper = false;
var disco = false;






// DO NOT FUCK WITH THE CODE BELOW

function id(input) {
  return document.getElementById(input);
}

function randnum(max) {
  return Math.floor(Math.random() * max + 1);
}

var chat_name = id('chat_name').value.split('');
var original_name = id('chat_name').value.toLowerCase();
var original_name_regex = new RegExp(original_name, 'i');
console.log(original_name, original_name_regex)

var name_length = chat_name.length;
var randselector = randnum(2);
var sequence_index = -1;


var disco_index = 0;
var has_generated_disco_names = false;
var disco_name1 = '';
var disco_name2 = '';

function randomize_casing() {
  chat_name = id('chat_name').value.split('');
  name_length = chat_name.length;
  
  for(var i = 0; i < name_length; i++) {
    if(randselector === 1) {
      chat_name[i] = chat_name[i].toLowerCase();
    }

    if(randselector === 2) {
      chat_name[i] = chat_name[i].toUpperCase();
    }

    randselector = randnum(2);
  }

  chat_name = chat_name.join("");

  id('chat_name').value = chat_name;
}

function sequence_lower_casing() {
  chat_name = id('chat_name').value
  name_length = chat_name.length;

  if(sequence_index < name_length - 1) {
    sequence_index++;
  } else {
    sequence_index = 0;
    chat_name = chat_name.toLowerCase();
  }

  chat_name = chat_name.toLowerCase();
  chat_name = chat_name.split('');

  chat_name[sequence_index] = chat_name[sequence_index].toUpperCase();

  chat_name = chat_name.join("");

  id('chat_name').value = chat_name;
}

function sequence_upper_casing() {
  chat_name = id('chat_name').value;
  name_length = chat_name.length;

  if(sequence_index < name_length - 1) {
    sequence_index++;
  } else {
    sequence_index = 0;
    chat_name = chat_name.toUpperCase();
  }

  chat_name = chat_name.toUpperCase();
  chat_name = chat_name.split('');

  chat_name[sequence_index] = chat_name[sequence_index].toLowerCase();

  chat_name = chat_name.join("");

  id('chat_name').value = chat_name;
}

function generate_disco_names() {
  var chat_name = id('chat_name').value.split('');
  var name_length = chat_name.length;
  
  // Generates the first disco mode name
  for(var i = 0; i < name_length; i++) {
    if(i % 2) {
      chat_name[i] = chat_name[i].toLowerCase();
    } else {
      chat_name[i] = chat_name[i].toUpperCase();
    }
  }
  
  disco_name1 = chat_name.join('');
  
  // Generates the second disco mode name
  for(var i = 0; i < name_length; i++) {
    if(i % 2) {
      chat_name[i] = chat_name[i].toUpperCase();
    } else {
      chat_name[i] = chat_name[i].toLowerCase();
    }
  }
  
  disco_name2 = chat_name.join('');
}

function disco_casing() {
  if(has_generated_disco_names === false) {
    generate_disco_names();
    has_generated_disco_names = true;
  }
  
  switch(disco_index) {
    case 0:
      id('chat_name').value = disco_name1;
      disco_index = 1;
      break;
    case 1:
      id('chat_name').value = disco_name2;
      disco_index = 0;
      break;
  }  
}

var observer = new MutationObserver(function(mutations){
  nameNode = document.getElementsByClassName('username')[document.getElementsByClassName('username').length - 1];
  nameClass = nameNode.parentNode.getAttribute('class');

  if(!/messagelog/i.test(nameNode.innerHTML) && !/room/i.test(nameNode.innerHTML) && !/system/i.test(nameNode.innerHTML) && !/network/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHMTL) && original_name_regex.test(nameNode.innerHTML) && /self/.test(nameClass)) {
    if(random === true) {
      randomize_casing();
    }

    if(sequence_lower === true) {
      sequence_lower_casing();
    }
    
    if(sequence_upper === true) {
      sequence_upper_casing();
    }
    
    if(disco === true) {
      disco_casing();
    }
  }
  
});

sequence_lower_casing();

observer.observe(document.querySelector('#chat_messages'), {childList: true});