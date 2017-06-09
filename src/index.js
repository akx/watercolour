import {generateCirclePoly, fractalMutatePoly, simplify} from './polygen';
import {uniform} from './rand';
import probmap from './probmap';
import colorSampler from './color-sampler';

require('./style.css');

const width = 2500;
const height = 3000;
const canvas = Object.assign(document.createElement('canvas'), {width, height});
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const sampler = colorSampler(require('./dickbutt.jpg'));

const drawPoly = (ctx, poly) => {
  ctx.beginPath();
  poly.forEach(({x, y}, i) => {
    if (i === 0) {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
  });
};

const colormap = probmap({
  red: 5,
  yellow: 2,
  orange: 3,
});

function drawBlob(ctx, radius, colorGetter, layers = 100) {
  let basePoly = generateCirclePoly(0 | uniform(3, 7), radius);
  for (let i = 0; i < 3; i++) {
    basePoly = simplify(fractalMutatePoly(basePoly, 30, false), 30);
  }
  const drawIteration = (iter) => {
    ctx.fillStyle = colorGetter();
    ctx.globalAlpha = uniform(0, 0.04);
    ctx.beginPath();
    let poly = basePoly;
    for (let i = 0; i < uniform(2, 6); i++) {
      poly = fractalMutatePoly(poly, 3);
    }
    drawPoly(ctx, poly);
    ctx.fill();
  };
  for (let i = 0; i < layers; i += 1) {
    drawIteration(i);
  }
}

//ctx.translate(300, 300);

function sampleSingle() {
  const fx = uniform(0, 1);
  const fy = uniform(0, 1);
  const rgb = sampler(fx, fy);
  if(rgb[0] > 240) return;
  const color = `hsl(${10 + fy * 20}, 80%, ${uniform(30, 60)}%)`;
  ctx.save();
  ctx.translate(fx * width, fy * height);
  const r = uniform(10, 20);
  drawBlob(ctx, r, () => color, 40);
  ctx.restore();
}

setInterval(() => {
  for(var i = 0; i < 5; i++) sampleSingle();
}, 5);


//for (let i = 0; i < 5; i++) {
//  const color = colormap();
//  drawBlob(ctx, 200, () => color, 30);
//  ctx.translate(0, 50);
//}
