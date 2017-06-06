export const uniform = (a, b) => {
  return a + Math.random() * (b - a);
};

let previous = false;
let y2 = 0;
// h/t https://github.com/processing/p5.js/blob/cf3ff94e21f548a54d24ab9e32a80397831f984d/src/math/random.js#L223-L244
export const gaussian = (m = 0, s = 1) => {
  let y1;
  let w;
  if (previous) {
    y1 = y2;
    previous = false;
  } else {
    let x1;
    let x2;
    do {
      x1 = uniform(0, 2) - 1;
      x2 = uniform(0, 2) - 1;
      w = x1 * x1 + x2 * x2;
    } while (w >= 1);
    w = Math.sqrt((-2 * Math.log(w)) / w);
    y1 = x1 * w;
    y2 = x2 * w;
    previous = true;
  }
  return y1 * s + m;
};
