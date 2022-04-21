import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatter = (data, formatName = 'stylish') => {
  if (formatName === 'stylish') {
    return stylish(data);
  }
  if (formatName === 'plain') {
    return plain(data);
  }
  return null;
};

export default chooseFormatter;
