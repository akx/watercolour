export default function colorSampler(src) {
  const sourceImage = new Image();
  sourceImage.src = src;
  let data = null, width, height;
  sourceImage.onload = () => {
    width = sourceImage.width;
    height = sourceImage.height;
    const sourceCanvas = Object.assign(document.createElement('canvas'), {width, height});
    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.drawImage(sourceImage, 0, 0, width, height);
    data = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
  };
  return (x, y) => {
    if (!data) return undefined;
    const xh = Math.floor(x * width);
    const yh = Math.floor(y * height);
    const off = yh * width * 4 + xh * 4;
    if (off < 0 || off > data.data.length) return undefined;
    const r = data.data[off];
    const g = data.data[off + 1];
    const b = data.data[off + 2];
    return [r, g, b];
  };
};
