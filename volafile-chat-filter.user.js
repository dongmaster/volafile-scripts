// ==UserScript==
// @name        Volafile chat filter
// @namespace   keystrokes.se
// @description Is someone shitposting in chat? Filter them with this script.
// @match       *://volafile.io/r/*
// @include     *://volafile.io/r/*
// @version     9
// @author      Dongmaster
// @author      cyberia
// ==/UserScript==

/*
** HOW TO USE:
**
** Filtering a user:
**  Edit line 59 below like this (replace user1 with a username):
**   var filtered = [/user1/i];
**  /user1/i means "Look for user1 in everyone's name and if it finds user1 in a username, remove the message." the i in /user1/i means it should ignore case-sensitivity.
**
** Filtering several users:
**  Edit line 59 below like this:
**   var filtered = [/user1/i, /user2/i, /user3/i];
**  Please not the fact that there are comma (,) symbols after each name. You should obviously change user1 and others to real usernames.
**
** Filtering by type:
**  Edit line 59, 60 and 61:
**   var filtered = [/dongmaster/i];
**   var usertype = [unreg];
**   var filter_by_type = true;
**  This filters users based on whether they are logged in or not.
**  The example provided above would filter the fake, NOT logged in, Dongmaster. The real, logged in, Dongmaster, would not be filtered.
**  There are three options for usertypes:
**   reg = Registered (logged in) user. Greennames.
**   unreg = Unregistered (NOT logged in) user. Whitenames.
**   all = Registered AND Unregistered user. Normal filtering, basically.
**  The all option was included because when you turn on usertype filtering, you NEED to provide a usertype for EVERY username.
**
** Filtering all whitenames but having some in a whitelist (heh):
**  Edit line 64 and 65:
**   var unregisteredWhitelist = [/coolwhiteuser/i, /milky/i];
**   var filterUnregistered = true;
**  This will filter ALL whitenames. If you put names in the whitelist, they will not be filtered.
**
*/

//Names entered in the filter_input textfield are only temporary.

// Do not edit these
var reg = 'profile';
var unreg = 'chat_message';
var all = 'all';
// Do not edit these. Look below.





//Edit the variables below to your liking!
var filtered = [];
var usertype = [];
var filter_by_type = false;


var unregisteredWhitelist = []; 
var filterUnregistered = false;
//Edit the variables above to your liking!












// Do not edit the shit below unless you know what you are doing. Don't complain about shit not working after you've made changes to the script. I'm looking at you, triggu.
function id(selector) {
    return document.getElementById(selector);
}

var textfieldSpan = document.createElement('SPAN');
textfieldSpan.setAttribute('id', 'chat_filter_span');
textfieldSpan.setAttribute('class', 'header_row_element');

id('header_row2').appendChild(textfieldSpan);

var textfield = document.createElement('INPUT');
textfield.setAttribute('id', 'filter_input');
textfield.setAttribute('type', 'text');
textfield.style.height = '1.2em';
textfield.style.verticalAlign = 'bottom';
textfield.setAttribute('placeholder', 'Add user to filter');
textfield.style.width = '145px';
textfield.setAttribute('autocomplete', 'off');

textfieldSpan.appendChild(textfield);

if(filter_by_type === true) {
	//This is retarded, I know. I tried to make a function but I failed and then I gave up. This is easier but not maintainable.
	var textfield2 = document.createElement('INPUT');
	textfield2.setAttribute('id', 'filter_input2');
	textfield2.setAttribute('type', 'text');
	textfield2.style.height = '1.2em';
	textfield2.style.verticalAlign = 'bottom';
	textfield2.setAttribute('placeholder', 'Type');
	textfield2.style.width = '42px';
	textfield2.style.marginLeft = '5px';
	textfield2.setAttribute('autocomplete', 'off');

	textfieldSpan.appendChild(textfield2);

	textfield2.addEventListener('keyup', function(e) {
			if(e.keyCode === 13) {
				input2_text = id('filter_input2').value;
				
				if(input2_text === 'reg') {
					input2_text = reg;
				} else if(input2_text === 'unreg') {
					input2_text = unreg;
				}
				
				usertype.push(input2_text);

				tempUser = id('filter_input').value;
				user = new RegExp(tempUser, 'i');
				 
				filtered.push(user);

				id('filter_input').value = '';
				id('filter_input2').value = '';
				
			}
	}, false);
}

var tempSpecUser;
var user;

textfield.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
			if(filter_by_type === true) {
				input2_text = id('filter_input2').value;
				
				if(input2_text === 'reg') {
					input2_text = reg;
				} else if(input2_text === 'unreg') {
					input2_text = unreg;
				}
				
       	usertype.push(input2_text);
			}
			
      tempUser = id('filter_input').value;
      user = new RegExp(tempUser, 'i');
       
      filtered.push(user);
      
      id('filter_input').value = '';
			id('filter_input2').value = '';
    }
}, false);



var observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
	
		for(j = 0; j < mutation.addedNodes.length; j++){
			nameNode = mutation.addedNodes[j].getElementsByClassName('username')[0];

			for(i = 0; i < filtered.length; i++) {
				if(filter_by_type === false) {
					if(filtered[i].test(nameNode.textContent)) {
						nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
					}
				} else if(filter_by_type === true) {
					if(filtered[i].test(nameNode.textContent)) {
						var utype = usertype[i];
						var uclass = nameNode.parentNode.getAttribute('class');
						var classregex = new RegExp(uclass, 'i');
						
						if(classregex.test(nameNode.parentNode.getAttribute('class'))) {
							if(utype === unreg && !/profile/.test(nameNode.parentNode.getAttribute('class'))) {
								nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
							} else if(utype === reg && /profile/.test(nameNode.parentNode.getAttribute('class'))) {
								nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
							} else if(utype === all && /chat_message/.test(nameNode.parentNode.getAttribute('class'))) {
								nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
							}
							
						}
						
					}
				}
				//console.log(mutation.addedNodes[j].getElementsByClassName('username')[0].innerHTML);
			}
            
            if(unregisteredWhitelist.length === 0) {
            	for(k = 0; k < unregisteredWhitelist.length+1; k++) {
            		if(filterUnregistered === true && nameNode.hasAttribute('href') === false && !/messagelog/i.test(nameNode.innerHTML) && !/room/i.test(nameNode.innerHTML) && !/system/i.test(nameNode.innerHTML) && !/network/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHMTL)) {
									nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
								}
            	}
            } else {
                for(x = 0; x < unregisteredWhitelist.length; x++) {
            			if(filterUnregistered === true && nameNode.hasAttribute('href') === false && !/messagelog/i.test(nameNode.innerHTML) && !/room/i.test(nameNode.innerHTML) && !/system/i.test(nameNode.innerHTML) && !/network/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHTML) && !unregisteredWhitelist[x].test(nameNode.innerHTML)) {
										nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
									}
            		}
            }
		}
	});
});



observer.observe(document.querySelector('#chat_messages'), {childList: true});