// ==UserScript==
// @name        Volafile chat filter
// @namespace   keystrokes.se
// @description Is someone shitposting in chat? Filter them with this script.
// @match       *://volafile.io/r/*
// @include     *://volafile.io/r/*
// @version     7
// @author      Dongmaster
// @author      cyberia
// ==/UserScript==

//Names entered in the filter_input textfield are only temporary.

var reg = 'profile';
var unreg = 'chat_message';
var all = 'all';

//Edit the variables below to your liking!
var filtered = []; //This is the blacklist for registered users AND unregistered users. Use this if you don't want to block all unregistered users! The format for filtering users: /username/i    if you want to filter several users: /user1/i, /user2/i
var usertype = []; //[OPTIONAL] This determines what registration status will be used when filtering a user. For example, You can filter someone who is unregistered and is using the name "Dongmaster" and not filter the registered person.
var filter_by_type = false;
/*	Formant for usertype:
**	reg = Filter registered users.
**	unreg = Filter unregistered users.
**  all = Filter registered AND unregistered users.
**
**	Please not that the name and the registration status has to line up. For example:
**		filtered = [/dongmaster/i, /dead/i, /lg188/i, /davinci/i];
**		usertype = [unreg, unreg, unreg];
**
**	The above example will filter unregistered people using the names dongmaster, dead and lg188. People using the name davinci, though, won't be filtered.
**
*/


var unregisteredWhitelist = []; //(Variable below must be enabled for this) This is the whitelist for unregistered users. The format for whitelisting users is; /username/i     If you want several users: /user1/i, /user2/i
var filterUnregistered = false; //Change to true if you want to filter ALL unregistered users (users in the whitelist are not filtered when this is enabled).
//Edit the variables above to your liking!

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
textfield.style.backgroundColor = '#264559';
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
	textfield2.style.backgroundColor = '#264559';
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
					if(filtered[i].test(nameNode.innerHTML.slice(0, -1))) {
						nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
					}
				} else if(filter_by_type === true) {
					if(filtered[i].test(nameNode.innerHTML.slice(0, -1))) {
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