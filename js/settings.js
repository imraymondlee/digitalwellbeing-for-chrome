'use strict';

let urlObject

// List current URL
chrome.storage.sync.get(['url'], function(result) {
  urlObject = result
  document.getElementById('currentBlocked').innerHTML = urlObject.url;
});


// Adding new URL
let newSiteSubmit = document.getElementById('newSiteSubmit');
newSiteSubmit.onclick = function(element) {
  let newSite = document.getElementById('newSite').value;
  
  // Add new url to object array  
  urlObject.url.push(newSite);
  chrome.storage.sync.set(urlObject, function() {
    console.log(urlObject.url + ' has been added into storage');
  });

  // Update list of url to display
  chrome.storage.sync.get(['url'], function(result) {
    urlObject = result
    document.getElementById('currentBlocked').innerHTML = urlObject.url;
  });
};


