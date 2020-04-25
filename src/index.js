import * as wt from "writing-tools";

let input = document.getElementById("input");
let output = document.getElementById("output");

input.focus();
input.addEventListener("keyup", handleKeyUp);

function handleKeyUp() {
  runChecks();
}

function addMarkers(markersByStart, text) {
  let result = "";
  let currentPosition = 0;

  const arrow =
    '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="12.172" height="10.567" viewBox="0 0 9.129 7.925"><defs/><path d="M.27 3.125c.9 3.9 1.3 4.8 2.5 4.8 1.3 0 7-5.7 6.3-6.4-.4-.3-1.9.5-3.4 2l-2.7 2.5-1-3c-1.4-4.1-2.5-4-1.7.1z" fill="#ac141c"/></svg>';

  for (const start in markersByStart) {
    const markers = markersByStart[start];

    result += text.substring(currentPosition, start);

    markers.forEach(function (marker) {
      if (marker.type == "start") {
        result += `<span class="suggestion-wrapper"><span class="suggestion">${arrow}${marker.suggestion}</span></span> <span class="error">`;
      } else {
        result += `</span>`;
      }
    });

    currentPosition = start;
  }

  result += text.substring(currentPosition); // show the rest of the text

  return result;
}

function runChecks() {
  var htmlNewLines = new RegExp("(<[br^>]*>)", "g");
  let text = input.innerHTML.replace(htmlNewLines, "\n");

  var re = new RegExp("(<[^>]*>)", "g");
  text = text.replace(re, "");

  var newLines = new RegExp("\n", "g");
  // let text = input.innerHTML.replace(newLines, "<br>");

  output.innerHTML = addMarkers(wt.runChecks(text), text).replace(
    newLines,
    "<br>"
  );
}

input.innerHTML =
  "Welcome to Writing Tools.<br /><br />" +
  "This text demonstrates what you can do. Type here on the the left and see notes on the right.<br /><br />" +
  "Have fun! However keep in mind that this is a work in progress.<br /><br />" +
  "I'm also working on a command line version of this, the motivation for this project is having something that I can use on the command line as I'm writing technical documentation, I really don't want to copy and paste my text into other online tools as I'm working.<br /><br />" +
  "Source code for the website: https://github.com/thiagooak/web-writing-tools<br /><br />" +
  "Source code for the library: https://github.com/thiagooak/writing-tools";

runChecks();
