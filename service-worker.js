let capture = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleCapture") {
    capture = !capture;
    sendResponse({ capture });
  } else if (request.action === "captureTab" && capture) {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, function(screenshotUrl) {
      sendResponse({ screenshotUrl });
    });
    return true;
  } else if (request.action === "saveImage") {
    const filename = 'screenshot.png'
    chrome.downloads.download({ url: request.image, filename });
    sendResponse({ filename });
  } else {
    sendResponse({ capture });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleCapture") {
    capture = !capture;
    sendResponse({ capture });
  } else if (request.action === "captureTab" && capture) {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, function(screenshotUrl) {
      sendResponse({ screenshotUrl });
    });
    return true;
  } else {
    sendResponse({ capture });
  }
});
