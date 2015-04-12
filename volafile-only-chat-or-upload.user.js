// ==UserScript==
// @name        Volafile only chat or upload script
// @namespace   keystrokes.se
// @description Shows only the chat or the file bin. There's an option for showing both but it would be better to just turn off the script for showing both. You can edit the script to add a key combination to toggle the view.
// @match       *://volafile.io/*
// @include     *://volafile.io/*
// @version     4
// @author      Dongmaster
// ==/UserScript==

// You can change the default key combination for toggling the 2 different views (files, chat).
// More information about what you can type in here is available here: http://www.openjs.com/scripts/events/keyboard_shortcuts/
var key_combination = "Ctrl+Shift";

shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}

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

shortcut.add(key_combination, switchPage, {
	"type" : "keydown"
});

