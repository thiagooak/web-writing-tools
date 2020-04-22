import * as wasm from "wasm-writing-tools";

let input = document.getElementById("input");
let output = document.getElementById("output");

input.focus();
input.addEventListener("keyup", handleKeyUp);

function handleKeyUp() {
  runChecks();
}

function runChecks() {
  var re = new RegExp("(<[^>]*>)", "g");
  let text = input.innerHTML.replace(re, "");

  const result = wasm.check(text);

  output.innerHTML = result;
}

runChecks();
