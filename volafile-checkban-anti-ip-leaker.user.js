// ==UserScript==
// @name        Volafile Checkban anti IP address leaker
// @namespace   volafile.checkban.anti.ip.address.leaker
// @description Tries to prevent you from leaking IP addresses when you're checking bans with the /checkban chat command. Remember, this is not bulletproof. This will stop IP address leaks 99% of the time
// @include     https://volafile.io/r/*
// @match       https://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

// The higher it is, the stricter it is. If you want it to be more lax, lower it.
// But don't go over 1.5 because then the word "check" will be marked as misspelled.
var misspell_tolerance = 1.49;




var needle = "checkban";
var needle_regex = new RegExp(needle, "i");

var chat = document.getElementById('chat_input');

chat.addEventListener("keydown", function(e) {
  if(e.keyCode === 13) {
    modify_message();
  }
}, true);

function modify_message() {
  var message = chat.value;
  var split = message.split(" ");
  
  for(var i = 0; i < 2; i++) {
    if(split[i][0] !== "\\" && split[i][0] !== "@") {
      var number = /\d/.exec(split[i]);
    
      if(number) {
        var index = split[i].indexOf(number) + 1;
        var sub_pos = split[i].substring(index - 1);
        var sub_neg = split[i].substring(-1, index - 1);

        split[i] = sub_neg + " " + sub_pos;
      }

      console.log("SPLIT1: " + split[i]);

      //split[i] = split[i].replace("/", "");
      
      //console.log(split[i].split(" ").length);
      var ip = "";

      if(split[i].split(" ").length == 2) {
        var new_split = split[i].split(" ")[0];
        if(new_split === "") {
          split[i] = split[i].split(" ")[1];

          var ip = "";
        } else {
          var ip = " " + split[i].split(" ")[1];
          //console.log("IP: " + ip);

          split[i] = split[i].split(" ")[0];


        }

        //console.log("Fixed");
      }

       //console.log(ip);
       console.log("SPLIT2: " + split[i]);

      if(is_misspelled(needle, split[i]) < misspell_tolerance) {
        split[i] = needle + ip;
      }

      if(split[i].toLowerCase() === needle || needle_regex.test(split[i]) && split[i].toLowerCase() !== "/" + needle) {
        split[i] = "/" + split[i];
      }

      console.log("SPLIT3: " + split[i]);
    } else {
      if(split[i][0] === "\\") {
       split[i] = split[i].substring(1);
       //console.log(split[i]);
      }
    }
  }
  
  var joined = split.join(" ");
  console.log("JOINED: " + joined);
  chat.value = joined;
}

function is_misspelled(seq1,seq2) {
    var len1=seq1.length;
    var len2=seq2.length;
    var i, j;
    var dist;
    var ic, dc, rc;
    var last, old, column;

    var weighter={
        insert:function(c) { return 1.; },
        delete:function(c) { return 0.5; },
        replace:function(c, d) { return 0.3; }
    };

    /* don't swap the sequences, or this is gonna be painful */
    if (len1 == 0 || len2 == 0) {
        dist = 0;
        while (len1)
            dist += weighter.delete(seq1[--len1]);
        while (len2)
            dist += weighter.insert(seq2[--len2]);
        return dist;
    }

    column = []; // malloc((len2 + 1) * sizeof(double));
    //if (!column) return -1;

    column[0] = 0;
    for (j = 1; j <= len2; ++j)
        column[j] = column[j - 1] + weighter.insert(seq2[j - 1]);

    for (i = 1; i <= len1; ++i) {
        last = column[0]; /* m[i-1][0] */
        column[0] += weighter.delete(seq1[i - 1]); /* m[i][0] */
        for (j = 1; j <= len2; ++j) {
            old = column[j];
            if (seq1[i - 1] == seq2[j - 1]) {
                column[j] = last; /* m[i-1][j-1] */
            } else {
                ic = column[j - 1] + weighter.insert(seq2[j - 1]);      /* m[i][j-1] */
                dc = column[j] + weighter.delete(seq1[i - 1]);          /* m[i-1][j] */
                rc = last + weighter.replace(seq1[i - 1], seq2[j - 1]); /* m[i-1][j-1] */
                column[j] = ic < dc ? ic : (dc < rc ? dc : rc);
            }
            last = old;
        }
    }

    dist = column[len2];
    return dist;
}

