// ==UserScript==
// @name        Volafile chat timestamps
// @namespace   volafile.improvements
// @description Adds timestamps to chat messages on Volafile.
// @match       https://volafile.io/r/*
// @include     https://volafile.io/r/*
// @version     4
// ==/UserScript==

/*
 *	@Author: Dongmaster
 *	@Author: lg188
 *
 *	Changelog:
 *	Version 1:
 *		Basic script
 *	Version 2:
 *		Cleaned out the script
 *	Version 3:
 *		Fixed the duplication bug
 *  	Version 4:
 *      	Fixed hours not having a 0 (zero) behind them if the hour is 9 or below.
 **/

console.debug("volafile-timestamps is running ");

var target = document.querySelector('#chat_messages');
var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {

		var valid = mutation.target.lastChild;
		var bla = valid.hasAttribute('timeAdded');

		if(bla == false ){
			addTimestamp();
			valid.setAttribute('timeAdded','true');
		}else{
			valid.setAttribute("timeAdded", 'false');
		}
	});
});

var config = {
	attributes: true,
	childList: true,
	characterData: true
};

var date, hours, minutes,seconds,finalTime;

function addTimestamp() {
	date = new Date();
	hours = date.getHours()
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	if (seconds <= 9) {
		seconds = '0' + seconds;
	}
    
	if (minutes <= 9) {
		minutes = '0' + minutes;
	}
    	if (hours <= 9) {
        	hours = '0' + hours;
	}
    

	finalTime = hours + ':' + minutes + ':' + seconds;
	document.getElementsByClassName('username') [document.getElementsByClassName('username') .length - 1].innerHTML = finalTime + ' | ' + document.getElementsByClassName('username') [document.getElementsByClassName('username') .length - 1].innerHTML;

}

observer.observe(target, config);
