chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureTab") {
    chrome.storage.local.get(['capture'], ({ capture}) => {
      // キャプチャーしない場合は何もしない
      if (!capture) {
        sendResponse({ error: 'capture is not started' });
        return false;
      }

      // スクリーンショットを撮る
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (screenshotUrl) => {
        sendResponse({ screenshotUrl });
      });
      return true;
    });
    return true;
  } else if (request.action === "saveImage") {
    const filename = 'screenshot.png'
    chrome.downloads.download({ url: request.image, filename });
    sendResponse({ filename });
  } else {
    sendResponse({ error: 'invalid action' });
  }
});
