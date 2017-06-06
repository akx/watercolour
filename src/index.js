import {generateCirclePoly, recursiveKneadPoly, recursiveFractalMutatePoly, simplify} from './polygen';
require('./style.css');

const width = 1024;
const height = 1024;
const canvas = Object.assign(document.createElement('canvas'), {width, height});
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const drawPoly = (ctx, poly) => {
  ctx.beginPath();
  poly.forEach(({x, y}, i) => {
    if (i === 0) {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
  });
};

let basePoly = recursiveFractalMutatePoly(generateCirclePoly(11), 2, 5, 0.3);
basePoly = simplify(basePoly, 15);
ctx.translate(512, 512);
ctx.globalAlpha = 0.03;
ctx.fillStyle = 'blue';

drawPoly(ctx, basePoly);
ctx.fill();

const drawIteration = () => {
  const poly = simplify(recursiveFractalMutatePoly(basePoly, 1.5, 7, 1), 15);
  drawPoly(ctx, poly);
  ctx.fill();
};
for (let i = 0; i < 100; i += 1) {
  setTimeout(drawIteration, i * 100);
}
