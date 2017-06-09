import {uniform} from './rand';

export default function probmap(mapping) {
  let acc = 0;
  const map = [];
  Object.keys(mapping).forEach((key) => {
    const prob = mapping[key];
    map.push({min: acc, max: acc + prob, key});
    acc += prob;
  });
  const total = acc;
  return () => {
    const value = uniform(0, total);
    for (let i = 0; i < map.length; i += 1) {
      if (value >= map[i].min && value < map[i].max) {
        return map[i].key;
      }
    }
    throw new Error();
  };
};
