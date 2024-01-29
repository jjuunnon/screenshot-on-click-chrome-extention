// ボタンを取得
const actionButton = document.getElementById('actionButton');

/**
 * キャプチャー状態を変更する関数
 * @param {boolean} capture キャプチャー状態
 */
const setCapture = (capture) => {
  chrome.storage.local.set({ capture });
  actionButton.innerText = capture ? 'Stop' : 'Start';
}

/**
 * キャプチャー状態を取得する関数
 */
const getCapture = async () => {
  const { capture } = await chrome.storage.local.get(['capture']);
  return capture;
};

getCapture().then(setCapture);

actionButton.addEventListener('click', async (e) => {
  // const response = await chrome.runtime.sendMessage({ action: "toggleCapture" });

  const capture = await getCapture();
  setCapture(!capture);
});
