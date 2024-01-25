document.getElementById('actionButton').addEventListener('click', async (e) => {
  const response = await chrome.runtime.sendMessage({ action: "toggleCapture" });
});
