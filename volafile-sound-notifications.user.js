// ==UserScript==
// @name        Volafile sound notification
// @namespace   volafile.soundnotification
// @description When someone highlights you it plays a sound. Please scroll down below the wall of links to the configuration part and configure the script.
// @include     https://volafile.org/r/*
// @version     2
// @grant       none
// ==/UserScript==

// Go down below the huge wall of links and shit to get to the place where you change the sound used

var sounds = {
  azu1 : 'https://spookyskeletons.me/audio/azu.mp3',
  azu2 : 'https://spookyskeletons.me/audio/azu2.mp3',
  bitchnigga : 'https://spookyskeletons.me/audio/bitchnigga.mp3',
  bobsaget : 'https://spookyskeletons.me/audio/bobsaget.mp3',
  cash : 'https://spookyskeletons.me/audio/cash.mp3',
  deeldoh : 'https://spookyskeletons.me/audio/deeldoh.mp3',
  dentalplan : 'https://spookyskeletons.me/audio/dentalplan.mp3',
  dolphin : 'https://spookyskeletons.me/audio/dolphin.mp3',
  dosh : 'https://spookyskeletons.me/audio/dosh.mp3',
  erectiondetection : 'https://spookyskeletons.me/audio/ERECTION_DETECTION.ogg',
  fail : 'https://spookyskeletons.me/audio/fail.mp3',
  gaben : 'https://spookyskeletons.me/audio/GABEN.mp3',
  galosengen : 'https://spookyskeletons.me/audio/galo.mp3',
  gamecube : 'https://spookyskeletons.me/audio/gamecube.mp3',
  glados32 : 'https://spookyskeletons.me/audio/glad32.mp3',
  glados5 : 'https://spookyskeletons.me/audio/glad8.mp3',
  glados8 : 'https://spookyskeletons.me/audio/glad8.mp3',
  grenata : 'https://spookyskeletons.me/audio/grenata.mp3',
  heil : 'https://spookyskeletons.me/audio/heil.mp3',
  codhitmarker : 'https://spookyskeletons.me/audio/HITMARKER.mp3',
  holla : 'https://spookyskeletons.me/audio/holla.mp3',
  codshot : 'https://spookyskeletons.me/audio/intervention%20420.mp3',
  lozitem1 : 'https://spookyskeletons.me/audio/item.mp3',
  lozitem2 : 'https://spookyskeletons.me/audio/item3.mp3',
  loadsamone : 'https://spookyskeletons.me/audio/lodsa.mp3',
  mharti : 'https://spookyskeletons.me/audio/mharti.mp3',
  money : 'https://spookyskeletons.me/audio/money.mp3',
  mybodyisready : 'https://spookyskeletons.me/audio/mybodyisready.mp3',
  nanisore : 'https://spookyskeletons.me/audio/NANI%20SORE.ogg',
  ohmygah : 'https://spookyskeletons.me/audio/ohmygah.mp3',
  smokeweedeveryday : 'https://spookyskeletons.me/audio/smokeweedeveryday.mp3',
  tuturu : 'https://spookyskeletons.me/audio/tuturu.mp3',
  wizardringtone : 'https://spookyskeletons.me/audio/wizard_ringtone.ogg',
  wow : 'https://spookyskeletons.me/audio/wow%20%3b).mp3',
  mgs_alert : 'https://spookyskeletons.me/audio/!.mp3',
  quake3 : 'https://spookyskeletons.me/audio/hitsound.ogg',
  honk : 'https://spookyskeletons.me/audio/honk.mp3'
};

// Quake 3 old link http://a.pomf.se/dymqir.ogg
// ################## CONFIGURATION THINGS BELOW ##################

/* Format:
[name] : sounds.[soundfile]

example: 
  "dongmaster" : sounds.quake3

*/
var person_sounds = {
  
};

// Correct format for the below variable: sounds.[anything in the sounds object]
// Example: sounds.mgs_alert
var highlight_sound = sounds.quake3; //Default highlight sound.
var random_mode = false; // TL;DR: Plays a random sound file everytime someone highlights you.
var person_mode = false; // TL;DR Plays a specific sound file everytime a specific person highlights you.
//The volume ranges from 0 to 1
//To set the volume to half set volume to 0.5
var volume = 1;


/*
Extensive explanations for the modes:
  Random mode: If this is enabled, a random sound will be played everytime someone highlights you/mention your name
  
  Person mode (retarded name that doesn't explain anything, sorry): If this is enabled, you can put stuff in the person_sounds object (An object is something that has keys and values, where a key holds a value).
  Example of person_sounds object:
    "dongmaster" : sounds.quake3,
    "xiao" : sounds.tuturu,
    "siberia" : sounds.bitchnigga 

  NOTE: Do you see that , behind the first two people? That's there because you need to separate them. If you only want one person there you do not have to put a , behind his/her name : sounds.sound thing


*/

// ################## CONFIGURATION THINGS ABOVE ##################

var audioplayer = document.createElement('AUDIO');
audioplayer.style.display = 'none';
audioplayer.src = highlight_sound;
audioplayer.volume = volume;
document.body.appendChild(audioplayer);

audioplayer.load();

var person_sound_length = Object.keys(person_sounds).length;
var def_highlight_sound = highlight_sound;

function play_sound() {
  audioplayer.play();
}

function fetch_random(obj) {
    var temp_key, keys = [];
    for(temp_key in obj) {
       if(obj.hasOwnProperty(temp_key)) {
           keys.push(temp_key);
       }
    }
    return obj[keys[Math.floor(Math.random() * keys.length)]];
}

function play_specific_sound(input) {
  //Loops through the person_sounds variable and looks for people :>
  // key is the key
  // input[key] returns the value
  
  var counter = 0;
  
  for (var key in input) {
   if (input.hasOwnProperty(key)) {
     //console.log(key + " -> " + input[key]);
     //return key;
     
     var username_haystack = nameNode[nameNode.length - 1].innerHTML;
     var username_needle = new RegExp(key, 'i');
     
     if(username_needle.test(username_haystack)) {
       highlight_sound = input[key];
       audioplayer.src = highlight_sound;
       if(audioplayer.readyState !== 4) {
          audioplayer.load();
          play_sound();
       }
      
       counter++;
     }
   }
  }
  
  
  if(counter === 0) {
    highlight_sound = sounds.quake3;
    audioplayer.src = highlight_sound;
    audioplayer.load();
    play_sound();
  }
  
  counter = 0;
  
}

if(random_mode === true) {
  audioplayer.src = fetch_random(sounds);
  audioplayer.load();
}

var nameNode = document.getElementsByClassName('username');

var observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
    
    nameNode = document.getElementsByClassName('username');
    
    var uclass = nameNode[nameNode.length - 1].parentNode.getAttribute('class');
    var classregex = new RegExp(uclass, 'i');
    
    
    setTimeout(function() {
    if(classregex.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class'))) {
      if(/highlight/.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class')) && random_mode === false && person_mode === false && !/messagelog/i.test(nameNode[nameNode.length - 1].innerHTML) && !/room/i.test(nameNode[nameNode.length - 1].innerHTML) && !/system/i.test(nameNode[nameNode.length - 1].innerHTML) && !/network/i.test(nameNode[nameNode.length - 1].innerHTML) && !/motd/i.test(nameNode[nameNode.length - 1].innerHTML) && !/log/i.test(nameNode[nameNode.length - 1].innerHTML)) {
        play_sound();
        
      } else if(/highlight/.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class')) && random_mode === true && person_mode === false && !/messagelog/i.test(nameNode[nameNode.length - 1].innerHTML) && !/room/i.test(nameNode[nameNode.length - 1].innerHTML) && !/system/i.test(nameNode[nameNode.length - 1].innerHTML) && !/network/i.test(nameNode[nameNode.length - 1].innerHTML) && !/motd/i.test(nameNode[nameNode.length - 1].innerHTML) && !/log/i.test(nameNode[nameNode.length - 1].innerHTML)) {
        highlight_sound = fetch_random(sounds)
        audioplayer.src = highlight_sound
        
        if(audioplayer.readyState !== 4) {
          audioplayer.load();
          play_sound();
        }
        
      } else if(/highlight/.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class')) && random_mode === false && person_mode === true && Object.keys(person_sounds).length >= 1 && !/messagelog/i.test(nameNode[nameNode.length - 1].innerHTML) && !/room/i.test(nameNode[nameNode.length - 1].innerHTML) && !/system/i.test(nameNode[nameNode.length - 1].innerHTML) && !/network/i.test(nameNode[nameNode.length - 1].innerHTML) && !/motd/i.test(nameNode[nameNode.length - 1].innerHTML) && !/log/i.test(nameNode[nameNode.length - 1].innerHTML)) {
        play_specific_sound(person_sounds);
      }
    }
    }, 10);
    
	});
});

observer.observe(document.querySelector('#chat_messages'), {childList: true});
