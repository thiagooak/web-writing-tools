import * as wasm from "wasm-writing-tools";

let output = document.getElementById("output");
let submit = document.getElementById("submit");

output.focus();
submit.addEventListener("click", runChecks);
output.addEventListener("blur", runChecks);
// output.addEventListener("keyup", handleKeyUp);

function handleKeyUp() {
  // @TODO caret keeps moving to 0. set range and selection don't work as I expected
  runChecks();
}

function runChecks() {
  var re = new RegExp("(<[^>]*>)", "g");
  let text = output.innerHTML.replace(re, "");

  const result = wasm.check(text);

  output.innerHTML = result;
}

runChecks();
