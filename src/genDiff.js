import path from 'path';
import readFile from './readFile.js';
import parse from './parsers.js';
import compareObjects from './compareObjects.js';
import chooseFormatter from './formatters/index.js';

const getData = (filepath) => {
  const file = readFile(filepath);
  const format = path.extname(filepath).substring(1);
  const data = parse(format, file);

  return data;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = compareObjects(data1, data2);
  const formatedData = chooseFormatter(diff, formatName);

  return formatedData;
};

export default genDiff;
