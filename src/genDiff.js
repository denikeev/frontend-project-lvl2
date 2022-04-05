import _ from 'lodash';
import getJson from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const json1 = getJson(filepath1);
  const json2 = getJson(filepath2);
  const commonKeys = _.union(Object.keys(json1), Object.keys(json2));
  const sortKeys = _.sortBy(commonKeys);
  const lineIndent = '  ';

  const result = sortKeys.reduce((acc, key) => {
    const inFirstHas = Object.hasOwn(json1, key) && !Object.hasOwn(json2, key);
    const inSecondHas = !Object.hasOwn(json1, key) && Object.hasOwn(json2, key);
    const isEqual = json1[key] === json2[key];

    if (inFirstHas) {
      return `${acc}${lineIndent}- ${key}: ${json1[key]}\n`;
    }
    if (inSecondHas) {
      return `${acc}${lineIndent}+ ${key}: ${json2[key]}\n`;
    }
    if (isEqual) {
      return `${acc}${lineIndent.repeat(2)}${key}: ${json1[key]}\n`;
    }
    return `${acc}${lineIndent}- ${key}: ${json1[key]}\n${lineIndent}+ ${key}: ${json2[key]}\n`;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
