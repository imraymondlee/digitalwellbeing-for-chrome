'use strict';


// Used to connect to background.js
var port = chrome.extension.connect({
    name: "FocusMode"
});


 // Enable / Disable blocking
if(focusModeEnabled) {
  document.getElementById('enableDisable').innerHTML = "Disable";
}else{
  document.getElementById('enableDisable').innerHTML = "Enable";
}

let enableDisable = document.getElementById('enableDisable');
enableDisable.onclick = function(element) {
  if(focusModeEnabled) {
    port.postMessage("disableFocusMode");
    focusModeEnabled = false;
    document.getElementById('breakButton').style.display = "none";
    document.getElementById('enableDisable').innerHTML = "Enable";
  }else{
    port.postMessage("enableFocusMode");
    focusModeEnabled = true;
    document.getElementById('breakButton').style.display = "inline-block";
    document.getElementById('enableDisable').innerHTML = "Disable";
  }
};


let breakButton = document.getElementById('breakButton');
breakButton.onclick = function(element) {
  port.postMessage("startBreak");
  document.getElementById('breakButton').style.display = "none";

};

