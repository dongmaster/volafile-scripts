// ==UserScript==
// @name        Volafile Username Middle-click
// @namespace   volafile.username.middle.click
// @description Middle-click on names in the file list to open their profile page.
// @include     https://volafile.org/r/*
// @version     3
// @grant       none
// ==/UserScript==

addEventListener("mouseup", function(e) {
    if (e.button !== 1) {
        return;
    }
    if (!e.target.classList.contains("tag_key_user")) {
        return;
    }
    e.preventDefault();
    e.stopPropagation();
    open("https://volafile.org/user/" + e.target.textContent);
    return false;
}, true);
