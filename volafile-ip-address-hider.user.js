// ==UserScript==
// @name        Volafile ip address hider
// @namespace   volafile.ip.hider
// @description Hides ip addresses for mods.
// @include     https://volafile.io/r/*
// @version     3.99
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log("running", GM_info.script.name, GM_info.script.version);

    addEventListener("DOMContentLoaded", function domload() {
        removeEventListener("DOMContentLoaded", domload, true);

        const style = document.createElement("style");
        style.textContent = `
body[noipspls] a.username > span,
body[noipspls] .tag_key_ip {
display: none;
}
`;
        document.body.appendChild(style);
        let state = localStorage.getItem("noipspls");
        if (state !== false) {
            state = true;
        }
        console.log(state);
        const update = () => {
            if (state) {
                document.body.setAttribute("noipspls", "true");
            }
            else {
                document.body.removeAttribute("noipspls");
            }
            localStorage.setItem("noipspls", state);
        };
        const toggle = () => {
            state = !state;
            update();
        };
        update();

        let btn = document.createElement("a");
        btn.textContent = "IP";
        btn.style.padding = "0 1ex";
        let uc = document.querySelector("#user_count_icon");
        uc.parentElement.insertBefore(btn, uc.nextSibling);
        btn.addEventListener("click", toggle);

        const commands = {
            ip(e) {
                toggle();
                return true;
            },
        };

        // hook the original command processor
        const chatp = Room.prototype._extensions.chat.prototype;
        const onCommand = chatp.onCommand;
        chatp.onCommand = function(command, e, ...args) {
            let fn = commands[command];
            if (fn && fn.call(commands, e, args)) {
                return;
            }
            args.unshift(e);
            args.unshift(command);
            return onCommand.apply(this, args);
        };
    }, true);
})();
