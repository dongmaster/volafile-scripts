// ==UserScript==
// @name        Volafile sound notification
// @namespace   volafile.soundnotification
// @description When someone highlights you it plays a sound. Please scroll down below the wall of links to the configuration part and configure the script.
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

// Go down below the huge wall of links and shit to get to the place where you change the sound used

var sounds = {
  airhorn : 'http://a.pomf.se/yolywt.mp3',
  azu1 : 'http://a.pomf.se/kqgrww.mp3',
  azu2 : 'http://a.pomf.se/emkejc.mp3',
  bitchnigga : 'http://a.pomf.se/cydfaz.mp3',
  bobsaget : 'http://a.pomf.se/ixruqi.mp3',
  cash : 'http://a.pomf.se/pzvphr.mp3',
  deeldoh : 'http://a.pomf.se/hgclng.mp3',
  dentalplan : 'http://a.pomf.se/ipyduh.mp3',
  dolphin : 'http://a.pomf.se/krsisd.mp3',
  dosh : 'http://a.pomf.se/awnjdo.mp3',
  erectiondetection : 'http://a.pomf.se/vlpobc.ogg',
  fail : 'http://a.pomf.se/ehgfqw.mp3',
  gaben : 'http://a.pomf.se/bsawmg.mp3',
  galosengen : 'http://a.pomf.se/muivge.mp3',
  gamecube : 'http://a.pomf.se/adhavq.mp3',
  glados32 : 'http://a.pomf.se/ktmxrr.mp3',
  glados5 : 'http://a.pomf.se/lorakj.mp3',
  glados8 : 'http://a.pomf.se/vyfdvn.mp3',
  grenata : 'http://a.pomf.se/jxfgbi.mp3',
  heil : 'http://a.pomf.se/kmrfdp.mp3',
  codhitmarker : 'http://a.pomf.se/uvvxax.mp3',
  holla : 'http://a.pomf.se/giwzsm.mp3',
  codshot : 'http://a.pomf.se/bfllrr.mp3',
  lozitem1 : 'http://a.pomf.se/iqvjbu.mp3',
  lozitem2 : 'http://a.pomf.se/gerorw.mp3',
  loadsamone : 'http://a.pomf.se/qqcbub.mp3',
  mharti : 'http://a.pomf.se/jmxorc.mp3',
  money : 'http://a.pomf.se/mbnznk.mp3',
  mybodyisready : 'http://a.pomf.se/uayvjs.mp3',
  nanisore : 'http://a.pomf.se/vtsgvl.ogg',
  ohmygah : 'http://a.pomf.se/zmaeem.mp3',
  smokeweedeveryday : 'http://a.pomf.se/wvtszp.mp3',
  tuturu : 'http://a.pomf.se/jfncan.mp3',
  wizardringtone : 'http://a.pomf.se/saotcz.ogg',
  wow : 'http://a.pomf.se/gnelps.mp3',
  mgs_alert : 'http://a.pomf.se/xdyclf.mp3',
  quake3 : 'https://spookyskeletons.me/hitsound.ogg',
  honk : 'https://spookyskeletons.me/honk.mp3'
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