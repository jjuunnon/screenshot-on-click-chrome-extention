document.addEventListener('click', (event) => {
  // クリック位置を取得
  const xOrigin = event.clientX / window.innerWidth;
  const yOrigin = event.clientY / window.innerHeight;

  chrome.runtime.sendMessage({action: "captureTab"}, function(response) {
    const { screenshotUrl } = response;

    // 画像を読み込んで、canvasに描画
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const x = xOrigin * img.width;
      const y = yOrigin * img.height;
      const magnificationRate = img.width / 640;

      // マウスポインタ風のパスを描画
      ctx.beginPath();
      ctx.moveTo(x + 0 * magnificationRate, y + 0  * magnificationRate);
      ctx.lineTo(x + 0 * magnificationRate, y + 10 * magnificationRate);
      ctx.lineTo(x + 3 * magnificationRate, y + 8  * magnificationRate);
      ctx.lineTo(x + 6 * magnificationRate, y + 14 * magnificationRate);
      ctx.lineTo(x + 7 * magnificationRate, y + 14 * magnificationRate);
      ctx.lineTo(x + 7 * magnificationRate, y + 13 * magnificationRate);
      ctx.lineTo(x + 4 * magnificationRate, y + 7  * magnificationRate);
      ctx.lineTo(x + 7 * magnificationRate, y + 7  * magnificationRate);

      // 黒で塗りつぶし
      ctx.fillStyle = 'black';
      // 枠線は白
      ctx.strokeStyle = 'white';
      ctx.lineWidth = magnificationRate;
      // パスを描画
      ctx.fill();
      ctx.stroke();

      const dataUrl = canvas.toDataURL('image/png');

      chrome.runtime.sendMessage({ action: "saveImage", image: dataUrl }, function(response) {});
    };
    img.src = screenshotUrl;
  });
}, true);
