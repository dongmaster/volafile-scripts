// ==UserScript==
// @name        Volafile only chat or upload script
// @namespace   keystrokes.se
// @description Shows only the chat or the file bin. There's an option for showing both but it would be better to just turn off the script for showing both.
// @match       *://volafile.io/*
// @include     *://volafile.io/*
// @version     3
// @author      Dongmaster
// ==/UserScript==

var switchVar = 0;
var showingBoth = false;
var showingBothCounter = 0;
var fix = 3;

function id(id) {
	return document.getElementById(id);
}

function retry() {
	if(showingBoth === false) {
		setTimeout(function() {
			id('chat_frame').style.width = '100%';
			
			if(id('chat_frame').getAttribute('width') !== '100%') {
				retry();
			}
		}, 100);
	}
}
retry();

function switchPage() {
	switchVar++;
	
	if(switchVar === 1) {
		id('file_list').style.display = 'block';
		
		id('files_frame').style.display = 'block';
		id('files_frame').style.left = '0px';
		
		id('chat_frame').style.display = 'none';
		
		id('switch_page_button').innerHTML = 'C';
	}
	
	if(switchVar === 2 && showingBoth === false) {
		id('file_list').style.display = 'none';
		
		id('files_frame').style.display = 'none';
		
		id('chat_frame').style.display = 'block';
		
		id('switch_page_button').innerHTML = 'U';
		switchVar = 0;
	}
}

function fiwWidth() {
	if(fix > 0) {
		setTimeout(function() {
			fix--;
			id('chat_frame').style.width = '27.1%';
			
			if(fix !== 0) {
				fixWidth();
			}
		});
    }
}

function showBoth() {
	showingBothCounter++;
	
	if(showingBothCounter === 1) {
		id('files_frame').style.display = 'block';
		id('file_list').style.display = 'block';
		id('chat_frame').style.display = 'block';
		id('chat_frame').style.width = '27.1%';
		id('files_frame').style.left = '27.1%';
		
		id('switch_page_button').style.display = 'none';
		showingBoth = true;
		
		if(fix !== 0) {
			fixWidth();
		}
	}
	
	if(showingBothCounter === 2) {
		id('files_frame').style.display = 'none';
		id('file_list').style.display = 'none';
		id('chat_frame').style.display = 'block';
		id('chat_frame').style.width = '100%';
		id('files_frame').style.left = '0px';
		
		switchVar = 0;
		
		id('switch_page_button').innerHTML = 'U';
		
		id('switch_page_button').style.display = 'inline-block';
		showingBoth = false;
		showingBothCounter = 0;
	}
}

id('file_list').style.display = 'none';
id('files_frame').style.display = 'none';

//id('room_name_container').style.border = 'none';
id('chat_frame').style.width = '100%';
id('uploadButton').style.marginRight = '0.30em';
id('files_frame').style.left = '0px';

var switchButton = document.createElement('BUTTON');
var switchButtonText = document.createTextNode('U');
switchButton.setAttribute('id', 'switch_page_button');
switchButton.setAttribute('class', 'button');
switchButton.style.display = 'inline-block';
switchButton.style.color = '#3A4040';
switchButton.style.marginRight = '0.30em';
switchButton.style.paddingRight = '0.30em';
switchButton.style.paddingLeft = '0.30em';
switchButton.style.border = 'none';
switchButton.addEventListener('click', switchPage, false);

switchButton.appendChild(switchButtonText);

id('upload_container').appendChild(switchButton);

var showBothButton = document.createElement('BUTTON');
var showBothButtonText = document.createTextNode('B');
showBothButton.setAttribute('id', 'show_both_button');
showBothButton.setAttribute('class', 'button');
showBothButton.style.display = 'inline-block';
showBothButton.style.color = '#3A4040';
showBothButton.style.marginRight = '0.30em';
showBothButton.style.paddingRight = '0.30em';
showBothButton.style.paddingLeft = '0.30em';
showBothButton.style.border = 'none';
showBothButton.addEventListener('click', showBoth, false);

showBothButton.appendChild(showBothButtonText);

id('upload_container').appendChild(showBothButton);
