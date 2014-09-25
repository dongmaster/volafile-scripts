// ==UserScript==
// @name        Volafile sound notification
// @namespace   volafile.soundnotification
// @description When someone highlights you it plays a sound. Change the highlight_sound variable to another audio file if you want to. Default is quake 3 hitsound.
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

// Go down below the huge wall of links and shit to get to the place where you change the sound used

/*
If a sound is not really short the sound will have a tag that states that it is longer
bossnigger is one of those sounds
*/

var sounds = {
  airhorn : 'https://43b157ed9afdd799e76f1814aba87f5b2e023df5.googledrive.com/host/0B7gas76SikGvT0ItY3VIai1WZkk',
  azu1 : 'https://ba5f7dc69fd61e9df434fd181e8dfe3689756fd8.googledrive.com/host/0B7gas76SikGvZy1IY2luTF8tWGs',
  azu2 : 'https://ddd62e2c3408a18035b2b20a6b066c59b6cd5f99.googledrive.com/host/0B7gas76SikGvNEdyOTc0eE1pdVU',
  bitchnigga : 'https://22d75d0d1a7c3dbf3c43c9eb2b8435784c2eb125.googledrive.com/host/0B7gas76SikGvUkZqZ2h6dDAxekE',
  bobsaget : 'https://885aeb6e48fd95bec8ea7f78578eff12d88edbbc.googledrive.com/host/0B7gas76SikGvZWRWQ1p1Szcyd3M',
  bodyshot : 'https://dc18237d8a3d7c502533f279550f6237dc52e51b.googledrive.com/host/0B7gas76SikGvcVFLcF9GVHd3X00',
  /* long */ bossnigger : 'https://21a35ed6f216a24e98a732e999dcfec02a08fcb8.googledrive.com/host/0B7gas76SikGvRl96V0E0WWtLNjQ',
  butipoopfromthere : 'https://8df371267f554ce88916f2e23f73cadce1924b43.googledrive.com/host/0B7gas76SikGvUmhWczlpclRkWXc',
  cash : 'https://d080c202b8f0dbfd8b20f7a83ea6b796f245efa1.googledrive.com/host/0B7gas76SikGvZjVDUnhpdlhzTFU',
  deeldoh : 'https://f874cb0069f86e0a8dfea4cfc7c1b7c4c312ebf7.googledrive.com/host/0B7gas76SikGvZFUyakdlMmFhRW8',
  dentalplan : 'https://9871a07c735efb52bd4b129439ce3ddd79b9a04a.googledrive.com/host/0B7gas76SikGveHdyWTZjaGF1VjQ',
  dick : 'https://44f85d6a1e5bb72864a77a9255b986673d4283d3.googledrive.com/host/0B7gas76SikGvZ1pFeTNud1ZyYW8',
  dolphin : 'https://e538bb6cab8f5fb290295023681c2fac9800ad96.googledrive.com/host/0B7gas76SikGvUzJiX1M1b3c3dUU',
  dosh : 'https://fd87b53620957e743b8ef72af2420adb7aae0d49.googledrive.com/host/0B7gas76SikGveDJYUG9XbGlfc1k',
  erectiondetection : 'https://a90a6b792e9893b1ded86d9806bc38a74e13d01f.googledrive.com/host/0B7gas76SikGvVEJod0Vfa3ZRa2c',
  fail : 'https://f5b933c5c2cb9e413817992fc726b0c18a1dc599.googledrive.com/host/0B7gas76SikGvcG90REFmaUZyNkU',
  gaben : 'https://ed7510beee834e6197ecfa9e427aec256a83bb9d.googledrive.com/host/0B7gas76SikGvOEI5d0lMc0hzVVU',
  galosengen : 'https://3d0bce6dd6abbb9544464e18a711d99ba8839593.googledrive.com/host/0B7gas76SikGveGJ3UlhmekYtSWs',
  gamecube : 'https://a9639698cb779e4600e8085f3a3c79c353abb42b.googledrive.com/host/0B7gas76SikGva1lTNklVQ0NrVDA',
  glados35 : 'https://39907b56414c3a6246410f82a41fde8d1e6c74bd.googledrive.com/host/0B7gas76SikGvWTZvS2w0QkZZUXc',
  glados5 : 'https://f39644efa2e6bb093b1110c68fa3fac47daf60eb.googledrive.com/host/0B7gas76SikGvMzZMaC0zTmgzbU0',
  glados8 : 'https://338fea01c3dddcb0ec5cadc8f197ceec55a08019.googledrive.com/host/0B7gas76SikGvWU9NNk5VNmoxOWs',
  grenata : 'https://f1724939fb6aad520c03f7c08e68defb286ddf5c.googledrive.com/host/0B7gas76SikGvNGs3ekxVWk5qN28',
  heil : 'https://7fbcc6f984e891a2d6451c2977b07c6f27713c5d.googledrive.com/host/0B7gas76SikGvUXozWE8xU01ORVU',
  codhitmarker : 'https://01bc88c538d81e21da43465dac4eb4da88e15d12.googledrive.com/host/0B7gas76SikGvUXYwZ1R1b1lyMmc',
  holla : 'https://6f8ae3439e7d961b0d9572b445c472b8642176b0.googledrive.com/host/0B7gas76SikGvd0pmU014alFCNTQ',
  codshot : 'https://533a39c7e176a43421778f777bb83fa2969d1d4f.googledrive.com/host/0B7gas76SikGvZ3c0OHlQY1p5bUU',
  lozitem1 : 'https://da519c5a54d327262fa9fd1d74a81c5ad387baf1.googledrive.com/host/0B7gas76SikGvamNKSDB6Tm16YTQ',
  lozitem2 : 'https://fa48a7bb3119040bc9cb38d1b73fd4297fd7f9b2.googledrive.com/host/0B7gas76SikGvOWVYZDZTN2FZWTA',
  loadsamone : 'https://6755ef819d8d4eda1df96e21679e8eaa7a5c7007.googledrive.com/host/0B7gas76SikGvdFBJWXl3Q25NWVE',
  mharti : 'https://f0601ad9ae31a8d8a21b5c4a39d8d7d8b28ea3b6.googledrive.com/host/0B7gas76SikGvN3dMWDRLb09kcGM',
  money : 'https://018a4802755880ee06eddd8848479fc69d4b68d9.googledrive.com/host/0B7gas76SikGvZHZQRTdmSi1VSUk',
  mybodyisready : 'https://dc479d82a2aa3e991c306ee3f068e8cc62700648.googledrive.com/host/0B7gas76SikGvU2E0d3YzN1JMOW8',
  nanisore : 'https://a7dee3feac379fc5208018b7e63cb5f7259df5a1.googledrive.com/host/0B7gas76SikGvN0F4SG1JSHNRLTg',
  ohmygah : 'https://6cfea3b64036eb611950e3a10e79d1d08ac4b9b6.googledrive.com/host/0B7gas76SikGvSHpFNllsUFljb28',
  penispenispenis : 'https://25b04f37cacbe58f62c60ef84f9aa5153185d407.googledrive.com/host/0B7gas76SikGvUHdtTEZGc0pWUEU',
  perkele : 'https://f752aea6b8428bb139b0ba3b6fe1620a882ae300.googledrive.com/host/0B7gas76SikGvMGVXMHdvNFdFUFU',
  pingas : 'https://2e8859dfbca41fb481f35594c0d18d4405f91719.googledrive.com/host/0B7gas76SikGvOHRHcWxmNXhYMmM',
  porkchop : 'https://b0b11335793d0886149049273a9f644c4268fcbf.googledrive.com/host/0B7gas76SikGvOG45bFBIQ21BWjQ',
  pubfag : 'https://6de5c3daae2fca335986e35d689c539085cf2d8a.googledrive.com/host/0B7gas76SikGvMnFzSlV5azVpeVE',
  rainingmoney : 'https://a9018f18ce127c59d4488918e259781bbacaa15a.googledrive.com/host/0B7gas76SikGvRU9wQkpPWUdsdG8',
  smokeweedeveryday : 'https://42f82b9eaacdf41255de4309ecdd5b10a257aeea.googledrive.com/host/0B7gas76SikGvTzFyaDh0YzlVc2s',
  tuturu : 'https://86ba8aa9924aa4a49b7e56e5a51993b4b94078c1.googledrive.com/host/0B7gas76SikGvRnZFc05jRjBIaDg',
  wizardringtone : 'https://3205b8dab21609a3450257372e86c62706a8c525.googledrive.com/host/0B7gas76SikGvNXpFNEJTLVNMcDA',
  wow : 'https://6d0db79666490d08c4bf079f2948a75484c65632.googledrive.com/host/0B7gas76SikGvTGdJUWVRSXZ5ZTA',
  mgs_alert : 'https://9f8ddd6756d17568ce52e63c52fdbf9e5eb82c62.googledrive.com/host/0B7gas76SikGvQ3RmZEF2TXh0Y2c',
  quake3 : 'https://32aae4694a657caf1308fa884f4a590517200cc2.googledrive.com/host/0B7gas76SikGvNE5TT3I1Z2dTVmc'
};

// Correct format for the below variable: sounds.[anything in the sounds object]
// Example: sounds.mgs_alert
var highlight_sound = sounds.quake3;
var random_mode = false;

var audioplayer = document.createElement('AUDIO');
audioplayer.style.display = 'none';
audioplayer.src = highlight_sound
document.body.appendChild(audioplayer);

audioplayer.load();

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
    
    
    
    if(classregex.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class'))) {
      if(/highlight/.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class')) && random_mode === false && !/messagelog/i.test(nameNode[nameNode.length - 1].innerHTML) && !/room/i.test(nameNode[nameNode.length - 1].innerHTML) && !/system/i.test(nameNode[nameNode.length - 1].innerHTML) && !/network/i.test(nameNode[nameNode.length - 1].innerHTML) && !/motd/i.test(nameNode[nameNode.length - 1].innerHTML) && !/log/i.test(nameNode[nameNode.length - 1].innerHTML)) {
        play_sound();
      } else if(/highlight/.test(nameNode[nameNode.length - 1].parentNode.getAttribute('class')) && random_mode === true && !/messagelog/i.test(nameNode[nameNode.length - 1].innerHTML) && !/room/i.test(nameNode[nameNode.length - 1].innerHTML) && !/system/i.test(nameNode[nameNode.length - 1].innerHTML) && !/network/i.test(nameNode[nameNode.length - 1].innerHTML) && !/motd/i.test(nameNode[nameNode.length - 1].innerHTML) && !/log/i.test(nameNode[nameNode.length - 1].innerHTML)) {
         audioplayer.src = fetch_random(sounds);
        audioplayer.load();
        play_sound();
       
      }
    }
    
	});
});

observer.observe(document.querySelector('#chat_messages'), {childList: true});