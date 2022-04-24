import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormatter = (data, formatName = 'stylish') => {
  if (formatName === 'stylish') {
    return stylish(data);
  }
  if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return json(data);
  }
  throw new Error(`Unknown format '${formatName}'`);
};

export default chooseFormatter;
