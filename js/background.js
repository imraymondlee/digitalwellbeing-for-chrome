'use strict';


let urlListObject = {
  url: [
    "*://*.reddit.com/*",
    "*://*.facebook.com/*",
    "*://*.youtube.com/*",
    "*://*.instagram.com/*",
    "*://*.pinterest.com/*"
  ]
}

// ID for 
let tid
// 15 seconds initial break time TEST
let breakTime = 15;


chrome.runtime.onInstalled.addListener(function() {
  // Setting preset blocked websites
  chrome.storage.sync.set(urlListObject, function() {
    console.log('Value is set to ' + urlListObject.url);
  });
});



let focusModeEnabled = false;
let startBreak = false;

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if(msg == "enableFocusMode"){
      enableFocusMode();
      focusModeEnabled = true;
    }else if(msg == "disableFocusMode"){
      disableFocusMode();
      focusModeEnabled = false;
    }else if(msg == "startBreak"){
      startingBreak();
      startBreak = true;
    }
  });
})


let startingBreak = function() {
  alert('Your break ends in ' + breakTime + ' seconds.')
  tid = setInterval(timer, 1000);  
  disableFocusMode();
}


let timer = function() {
  breakTime = breakTime - 1;

  if(breakTime == 0){
    abortTimer();
  }
}; 

let abortTimer = function() {
  clearInterval(tid);
  breakTime = 15;
  alert("Your break has ended.");

  enableFocusMode();
}




let disableFocusMode = function () {
  chrome.webRequest.onBeforeRequest.removeListener(blocking);
}; 
let enableFocusMode = function () {
  chrome.webRequest.onBeforeRequest.addListener(blocking ,{urls:urlListObject.url}, ["blocking"]);

  fetch('http://digitalwellbeing-server.azurewebsites.net/phoneFocus')
    .then(function(response) {
      console.log(response);
    });


}; 
// Blocking function for chrome.webRequest.onBeforeRequest listener
let blocking = function () {
  return {
    redirectUrl: chrome.extension.getURL("/html/blocked.html")
  };
}; 
