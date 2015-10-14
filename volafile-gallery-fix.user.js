// ==UserScript==
// @name        Volafile Gallery Fix
// @namespace   volafile.gallery.fix
// @description Fixes the bug where two tabs open instead of one in the gallery
// @include     https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

var target = document.querySelector('#gallery_image_wrapper');

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
    var nodes = mutation.addedNodes;
    
    if (nodes.length > 0) {
      init();
    }
	});
});

var config = {
	childList: true
};

observer.observe(target, config);

function init() {
  function fix_click(e) {
    var gallery_image = document.getElementById("gallery_image");
    e.stopPropagation();
    e.preventDefault();

    var src = gallery_image.src;

    gallery_image.src = "";

    window.open(src, "_blank");
    gallery_image.src = src;
  }

  gallery_image.addEventListener("click", fix_click, true);
}
