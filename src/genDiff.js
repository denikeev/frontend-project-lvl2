import _ from 'lodash';
import getJsonFromFile from './getJsonFromFile.js';

const genDiff = (filepath1, filepath2) => {
  const json1 = getJsonFromFile(filepath1);
  const json2 = getJsonFromFile(filepath2);
  const commonKeys = _.union(Object.keys(json1), Object.keys(json2));
  const sortKeys = _.sortBy(commonKeys);
  const lineIndent = '  ';

  const result = sortKeys.reduce((acc, key) => {
    if (Object.hasOwn(json1, key) && !Object.hasOwn(json2, key)) {
      return `${acc}${lineIndent}- ${key}: ${json1[key]}\n`;
    }
    if (!Object.hasOwn(json1, key) && Object.hasOwn(json2, key)) {
      return `${acc}${lineIndent}+ ${key}: ${json2[key]}\n`;
    }
    if (json1[key] === json2[key]) {
      return `${acc}${lineIndent.repeat(2)}${key}: ${json1[key]}\n`;
    }
    return `${acc}${lineIndent}- ${key}: ${json1[key]}\n${lineIndent}+ ${key}: ${json2[key]}\n`;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
