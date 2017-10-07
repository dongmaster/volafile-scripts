// ==UserScript==
// @name        volafile-mod
// @namespace   org.lg188.volafile-mod
// @description Aids the current volafile moderators
// @include     https://volafile.org/*
// @exclude     https://volafile.org/
// @exclude     https://volafile.org/rules
// @exclude     https://volafile.org/top/*
// @exclude     https://volafile.org/tos
// @exclude     https://volafile.org/privacy
// @exclude     https://volafile.org/impressum
// @exclude     https://volafile.org/user/*
// @exclude     https://volafile.org/donate
// @exclude     https://volafile.org/about
// @exclude     https://volafile.org/faq
// @exclude     https://volafile.org/different
// @exclude     https://volafile.org/credits
// @version     0.3.0-rc2
// @grant       none
// @require     https://code.jquery.com/jquery-2.1.3.js
// @require	http://notifyjs.com/dist/notify-combined.js
// ==/UserScript==

// Default Settings
var defaultconf =  { interval : 60, threshold : 72, debug : true, rate: 1, regex: false};

var config = defaultconf;

var regex = [];
/*
 * Save a value int the local storage
 */
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

/*
 * Load a value from the local storage
 */
function load(key) {return JSON.parse(localStorage.getItem(key));}
function log(str, type){
	if(typeof type === 'undefined'){ type = "info";}
	$.notify(str, type);
}

if(load("config:data")){
	config = load("config:data");
	if(typeof config.interval === 'undefined' || isNaN(config.rate) ){
		config.interval = defaultconf.interval;
	}
	if(typeof config.threshold === 'undefined' || isNaN(config.interval) ){
		config.threshold = defaultconf.threshold;
	}
	if(typeof config.debug === 'undefined' ){
		config.debug = defaultconf.debug;
	}
	if(typeof config.rate === 'undefined' || isNaN(config.rate) ){
		config.rate = defaultconf.rate;
	}
	if(typeof config.regex === 'undefined' ){
		config.regex = defaultconf.regex;
	}
}

var path = window.location.pathname;
var loc = "undetected";
var roomID = "";
var counter = 0;
var help = "n next room (preceded by history) \n N next room in new tab\n p go back into history\n r reload\n q quit \n : execute command \n F1 help \n / search \n i insert";
var help2= "s[et] <variable> [<value>] \n d[el] <variable>";

switch(path){
	case "/adiscover":
		loc = "adiscover";
	break;
	case "reports":
		loc = "reports";
	break;
	default:
		if(path.match(/^\/r\/.{1,}/)){
		loc = "room";
		counter = -1;
		roomID = path.match(/^\/r\/(.{1,})/)[1];
		window.addEventListener('unload', saveData);
		window.addEventListener('keypress',keyHandler);
		var wrench = $("#room_settings > span");
		if(wrench){
			wrench.append("<span id='room_public'>P<span>");
		}
	}

}

setInterval(tick, config.rate * 1000);

function saveData(e,state){
	if(typeof state === 'undefined'){
		state = "closed";
	}
	//collect data;
	var data = {"state" : state};

	var strgID = "meta:" + roomID;
	data.date = Date.now();
	data.private =  window.config.private;
	data.disabled =  window.config.disabled;
	save(strgID, data);
}

function tick(){
	save("config:data", config);
	$("a ").not("nVolaLink").each(colourLinks);
	if(loc == "room"){
		saveData(null, "open");
		if(window.config.disabled){

			$("#room_name").css({color: "grey"});
		}else{
			var colour = $("body").css("color");
			$("#room_name").css({color: colour });
		}
		if(!window.config.private){
			$("#room_public").css({visibility: "visible "});
		}else{
			$("#room_public").css({visibility: "hidden"});
		}
	}
	if(counter > -1){
		counter++;
		if(counter >= config.interval){
			location.reload();
		}
	}
}



function colourLinks(){
	var dest = $(this).context;
	if(dest.pathname.match(/^\/r\/.{1,}/) && dest.hostname == "volafile.org"){
		var id = dest.pathname.match(/^\/r\/(.{1,})/)[1];
		var strgID = "meta:" + id;
		var roomData = load(strgID);
		if( roomData !== null){
			if(roomData.disabled !== true ){
				$(this).css({color: "cyan"});
				if(roomData.state == "open"){
					$(this).css({color: "#D880FC"});
				}else{
					if(roomData.date !== null && roomData.state == "closed"){
						var now = Math.floor(Date.now() / 1000);
						var diff = now - Math.floor(roomData.date/1000);
						var value = (diff / (config.threshold * 3600))*255;
						if(value > 255) {
							value = 255;
							try{
								var strTarget = load("config:next");

								if(strTarget === "" || load("meta:"+strTarget) !== undefined ){
									save("config:next", id);
								}
							}catch(e){
								console.log(e);
							}
						} else {
							value = Math.ceil(value);
						}
						var r = value;
						var g = 255-value;
						var b = 50;
						var rgb = "rgb(" + r + "," + g + "," + b + ")";
						$(this).css({color:rgb});

					}else{
						$(this).css({color:"pink"});
					}
				}
			}else{
				$(this).css({color: "grey"});
			}

		}else{
			if( !load(strgID) ){
				save("config:next", id);
			}
		}

	}else{
		if(dest.hostname == "volafile.org" && dest.pathname.match(/^\/get\/.{1,}/)){
			reg(this);
		}else{
			$(this).addClass("nVolaLink");
		}
	}
}

function keyHandler(e){
	var key = e.key;
	var target = e.target.toString();
	var TextArea = target.search(/TextAreaElement/);
	var input =  target.search(/InputElement/);
	if(TextArea < 0 && input < 0 ){
		var next , nextURL;
		switch(key){
			
		}
	}else{
		if(key == "Escape" || key == "Esc"){
			document.getElementById("room_filters").style.display = "none";
			document.getElementById("room_search").style.display = "none";
			document.getElementById("show_search_ui").style.display = "";
			document.activeElement.blur();
		}
	}
}

function reg(obj){
	if(config.regex){
		try{
			for(var i = 0; i < regex.length; i++){
				var re = regex[i];
				var data = re.split("/");
				//console.log(data);
				if(data[2].match(/\b[fu]\b/)){
					var color = /color:\((\x{3}|\x{6})\)/;
					color = data[2].match(color);
					if(obj.innerHTML.match(data[1])){
						$(obj).css({"color":"pink"});
					}
				}
			}
		}catch(e){
			console.log(e);
		}
	}
}
