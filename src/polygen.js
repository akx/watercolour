import {uniform} from './rand';

export const generateCirclePoly = (nPoints = 8, radius = 300, angle = uniform(0, Math.PI * 2)) => (
  new Array(nPoints).fill(0).map((_, i) => (
    {
      x: Math.cos(i / nPoints * Math.PI * 2 + angle) * radius,
      y: Math.sin(i / nPoints * Math.PI * 2 + angle) * radius,
    }
  ))
);

export const getSegmentLength = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

function recursively(fn, variance, iterations, multiplier = 1) {
  return (obj) => {
    let cVariance = variance;
    for (let i = 0; i < iterations; i++) {
      obj = fn(obj, cVariance);
      cVariance *= multiplier;
    }
    return obj;
  };
}

export const fractalMutatePoly = (poly, variance, useSeglen = true) => {
  const newPoly = [];
  for (let i = 0; i < poly.length; i++) {
    const pa = poly[i % poly.length];
    const pb = poly[(i + 1) % poly.length];
    const segLen = (useSeglen ? Math.sqrt(getSegmentLength(pa, pb)) : 1);
    const mp = {
      x: (pa.x + pb.x) * 0.5 + uniform(-variance, variance) * segLen,
      y: (pa.y + pb.y) * 0.5 + uniform(-variance, variance) * segLen,
    };
    newPoly.push(pa);
    newPoly.push(mp);
    if (i !== poly.length - 1) {
      newPoly.push(pb);
    }
  }
  return newPoly;
};

export const kneadPoly = (poly, variance) => {
  const newPoly = [];
  for (let i = 0; i < poly.length + 1; i++) {
    const pa = poly[i % poly.length];
    const pb = poly[(i + 1) % poly.length];
    const segLen = getSegmentLength(pa, pb);
    const mp = {
      x: pa.x + segLen * uniform(-variance, +variance),
      y: pa.y + segLen * uniform(-variance, +variance),
    };
    newPoly.push(mp);
  }
  return newPoly;
};


export const simplify = (poly, maxDist = 5) => {
  const newPoly = [poly[0]];
  for (let i = 1; i < poly.length; i++) {
    const segLen = getSegmentLength(newPoly[newPoly.length - 1], poly[i]);
    if (segLen >= maxDist) {
      newPoly.push(poly[i]);
    }
  }
  return newPoly;
};

export const recursiveFractalMutatePoly = (poly, variance, iterations, multiplier = 1) => {
  return recursively(fractalMutatePoly, variance, iterations, multiplier)(poly);
};

export const recursiveKneadPoly = (poly, variance, iterations, multiplier = 1) => {
  return recursively(kneadPoly, variance, iterations, multiplier)(poly);
};
