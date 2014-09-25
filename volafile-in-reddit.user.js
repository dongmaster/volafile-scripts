// ==UserScript==
// @name       Volafile in reddit!
// @namespace  http://volafile.dongmaster.redditiframe.com
// @version    1
// @description  Volafile in reddit!
// @match      www.reddit.com/r/*
// @author     Dongmaster
// @copyright  Public Domain
// ==/UserScript==

var height = '90%'; //CHANGE THIS VALUE IF IT LOOKS BAD. Ranges from 0-100%. You can also use 200px (pixels) or 5em (Size of a "M"). I recommend using percent though.

var sideBar = document.getElementsByClassName('side')[0]
var ad = document.getElementsByClassName('promotedlink')[0];

var spacers = document.getElementsByClassName('spacer');

var iframe = document.createElement('IFRAME');
iframe.setAttribute('src', 'http://volafile.io');
iframe.setAttribute('frameborder', '0');
iframe.style.display = 'block';
iframe.style.zindex = 999;
iframe.style.width = '100%';
iframe.style.height = height;
iframe.style.zIndex = '9999999999';
iframe.style.position = 'absolute';
iframe.style.top = '0';

sideBar.style.position = 'fixed';
sideBar.style.right = '0';
sideBar.style.height = '100%';

sideBar.appendChild(iframe);
/*
for(var i = 0; i < sideBar.childNodes.length; i++) {
	sideBar.removeChild(sideBar.childNodes[i]);
}
*/
/*
for(var j = 0; j < 2; j++) {
	sideBar.removeChild(sideBar.childNodes[j]);
    sideBar.removeChild(sideBar.firstChild);
}
*/
/*
for(var k = 0; k < spacers.length; k++) {
    
}
*/
ad.style.display = 'none';






