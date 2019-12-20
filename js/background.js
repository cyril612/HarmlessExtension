// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.status === "complete" && tab.url !== undefined && (tab.url.startsWith("https://") || tab.url.startsWith("http://"))) { //tab could also be a pdf file or a chrome:// url
    var microsecondsBack = 1000 * 60 * 60 * 24 * 5000;
    var startTime = (new Date).getTime() - microsecondsBack;
    chrome.history.search({text:"", maxResults: 10000000, startTime: startTime},function(history){
      let randomUrl = history[getRandomInt(0,history.length)].url;
      console.log(randomUrl);
      chrome.tabs.create({ url: randomUrl });
    });
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}