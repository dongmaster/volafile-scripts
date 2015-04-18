// ==UserScript==
// @name        Volafile chat max history
// @namespace   volafile.chat.max.history
// @description Allows you to change the chat_max_history property in the config
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

window.config.chat_max_history = 1000;