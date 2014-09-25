// ==UserScript==
// @name        Volacoins
// @namespace   http://volafile.dongmaster.volacoins3
// @description Click the logo, get money cash volacoins.
// @match       *://volafile.io/r/*
// @include     *://volafile.io/r/*
// @version     5
// @grant       none
// ==/UserScript==
function load(key) { // Easier to type.
	return JSON.parse(localStorage.getItem(key))
}


if(load('topcheck') === undefined || load('topcheck') === null) {
    var volacoins = 0;
    var timerInterval = 5000;
    localStorage.clear;
    localStorage.setItem('volacoinKey', JSON.stringify(volacoins));
    localStorage.setItem('timerIntervalKey', JSON.stringify(timerInterval));
    localStorage.setItem('topcheck', ('true'));
} else {
    var volacoins = parseInt(localStorage.getItem('volacoinKey'));
    var timerInterval = parseInt(localStorage.getItem('timerIntervalKey'));
}


var firstShopItemPrice = 100;

var volacoinHeaderElement = document.createElement('SPAN');
var volacoinHeaderElementText = document.createTextNode('Volacoin');
volacoinHeaderElement.appendChild(volacoinHeaderElementText);
volacoinHeaderElement.setAttribute('class', 'header_row_element');
volacoinHeaderElement.setAttribute('style', 'user-select: none; -webkit-user-select: none; -moz-user-select: none;')
//Creating the header element here.


var header1 = document.getElementById('header_row1');
header1.appendChild(volacoinHeaderElement);



var volacoinMenu = document.createElement('DIV');
var volacoinMenuText = document.createTextNode('test');
volacoinMenu.setAttribute('class', 'ui_frame');
volacoinMenu.setAttribute('style', 'width: 410px; height: 250px; display: none; margin-left: auto; margin-right: auto; position: relative; top: 106px;');
volacoinMenu.setAttribute('id', 'volacoin_menu');
document.body.appendChild(volacoinMenu);
//Creating the Volacoin menu here

var showMenuCounter = 0;
var volacoinMenuId = document.getElementById('volacoin_menu');

volacoinMenuConfig = 'width: 410px; height: 250px; margin-left: auto; margin-right: auto; position: relative; top: 106px;';
//Useful for when i hide/show the menu

function showMenu() {
    showMenuCounter++;
    
    if(showMenuCounter === 1) {
        volacoinMenuId.setAttribute('style', volacoinMenuConfig+'display: block;');
    }
    
    if(showMenuCounter === 2) {
        volacoinMenuId.setAttribute('style', volacoinMenuConfig+'display: none;');
        showMenuCounter = 0;
    }
}

var showShopMenuCounter = 0;

function showShopMenu() {
    showShopMenuCounter++;
    console.log('hey')
    
    if(showShopMenuCounter === 1) {
        shopMenu.style.display = 'block';
    }
    
    if(showShopMenuCounter === 2) {
        shopMenu.style.display = 'none';
        showShopMenuCounter = 0;
    }
}


var clickMultiplier = 1;

function increment() {
    volacoins += clickMultiplier;
    volacoinAmount.innerHTML='Volacoins: '+volacoins;
    localStorage.setItem('volacoinKey', volacoins);
}

volacoinHeaderElement.addEventListener('click', showMenu, false);


var multiplier = 1;

function updateVolacoinText() {
    volacoinAmount.innerHTML='Volacoins: '+volacoins;
    volacoinAmount2.innerHTML='Volacoins: '+volacoins;
    localStorage.setItem('volacoinKey', volacoins);
}

function increment_passive() {
    setTimeout(function() {
        volacoins += multiplier;
        increment_passive();
        updateVolacoinText();
    }, timerInterval);
}

increment_passive();

function buyFirst() {
    if(volacoins >= 100 && timerInterval > 1) {
        volacoins -= 100;
        timerInterval--;
        localStorage.setItem('timerIntervalKey', timerInterval);
        updateVolacoinText();
    }
}

var clickableFrame = document.createElement('DIV');
clickableFrame.setAttribute('style', 'margin-left: auto; margin-right: auto; display: block; margin-top: 40px;');

volacoinMenu.appendChild(clickableFrame);

var clickable = document.createElement('IMG');
clickable.setAttribute('src', 'http://volafile.io/static/logo_mid.png');
clickable.setAttribute('style', 'margin-left: auto; margin-right: auto; display: block; margin-top: 40px;');
clickableFrame.appendChild(clickable);

clickable.addEventListener('click', increment, false);


var volacoinAmount = document.createElement('P');
var volacoinAmountText = document.createTextNode('Volacoins: '+volacoins);
//volacoinAmount.setAttribute('style', 'position: absolute; bottom: 0;')
volacoinAmount.appendChild(volacoinAmountText);

volacoinMenu.appendChild(volacoinAmount);


var showShopButton = document.createElement('BUTTON');
var showShopButtonText = document.createTextNode('Shop');
showShopButton.appendChild(showShopButtonText);
showShopButton.setAttribute('class', 'button');
showShopButton.setAttribute('style', 'margin-bottom: 20px;')

volacoinMenu.appendChild(showShopButton);
showShopButton.addEventListener('click', showShopMenu, false);

var closeVolacoinMenuButton = document.createElement('BUTTON');
var closeVolacoinMenuButtonText = document.createTextNode('Close');
closeVolacoinMenuButton.appendChild(closeVolacoinMenuButtonText);
closeVolacoinMenuButton.setAttribute('class', 'button');
closeVolacoinMenuButton.setAttribute('style', 'position: absolute; bottom: 13px; right: 10px;');
volacoinMenu.appendChild(closeVolacoinMenuButton);

closeVolacoinMenuButton.addEventListener('click', showMenu, false);

var shopMenu = document.createElement('DIV');
shopMenu.setAttribute('class', 'ui_frame');
shopMenu.setAttribute('style', 'width: 700px; height: 55%; display: none; margin-left: auto; margin-right: auto; position: relative; top: -144px;')
document.body.appendChild(shopMenu);


var shopBackButton = document.createElement('BUTTON');
var shopBackButtonText = document.createTextNode('Close');
shopBackButton.appendChild(shopBackButtonText);
shopBackButton.setAttribute('class', 'button');
shopBackButton.setAttribute('style', 'position: absolute; bottom: 10px; right: 10px;')
shopMenu.appendChild(shopBackButton);

shopBackButton.addEventListener('click', showShopMenu, false);

var shopMenuContentContainer = document.createElement('DIV');
shopMenuContentContainer.setAttribute('class', 'ui_frame_content');
shopMenu.appendChild(shopMenuContentContainer);

var volacoinAmount2 = document.createElement('P');
var volacoinAmount2Text = document.createTextNode('Volacoins: '+volacoins);
volacoinAmount2.setAttribute('style', 'position: absolute; top: 0;')
volacoinAmount2.appendChild(volacoinAmount2Text);

shopMenuContentContainer.appendChild(volacoinAmount2);

var shopMenuTable = document.createElement('TABLE');
var shopMenuTableTR = document.createElement('TR');
var shopMenuTableTD_1 = document.createElement('TD');
var shopMenuTableTD_2 = document.createElement('TD');
shopMenuTable.setAttribute('class', 'pretty_table');
shopMenuTable.style.marginTop = '50px';
shopMenuTable.appendChild(shopMenuTableTR);
shopMenuTable.appendChild(shopMenuTableTD_1);
shopMenuTable.appendChild(shopMenuTableTD_2);
shopMenuContentContainer.appendChild(shopMenuTable);

var shopItem_1 = document.createElement('P');
var shopItemText_1 = document.createTextNode('1. Faster passive gain. Price: '+firstShopItemPrice);
shopItem_1.appendChild(shopItemText_1);
shopMenuTableTD_1.appendChild(shopItem_1);

var shopItemButton_1 = document.createElement('BUTTON');
var shopItemButtonText_1 = document.createTextNode('Buy');
shopItemButton_1.setAttribute('class', 'button');
shopItemButton_1.appendChild(shopItemButtonText_1);

shopMenuTableTD_2.appendChild(shopItemButton_1)

shopItemButton_1.addEventListener('click', buyFirst, false);








