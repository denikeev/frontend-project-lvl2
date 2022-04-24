import _ from 'lodash';
import getJson from './parsers.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const json1 = getJson(filepath1);
  const json2 = getJson(filepath2);

  const compareObjects = (obj1, obj2) => {
    const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedKeys = _.sortBy(commonKeys);

    const tree = sortedKeys.flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const isDeleted = () => Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key);
      const isAdded = () => !Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key);
      const isObjects = () => _.isObject(value1) && _.isObject(value2);
      const isDifferent = () => value1 !== value2;

      if (isDeleted()) return { key, value: value1, type: 'deleted' };
      if (isAdded()) return { key, value: value2, type: 'added' };
      if (isObjects()) return { key, type: 'internal', children: compareObjects(value1, value2) };
      if (isDifferent()) return { type: 'updated', children: [{ key, value: value1, type: 'deleted' }, { key, value: value2, type: 'added' }] };
      return { key, value: value1, type: 'equal' };
    });

    return tree;
  };

  const innerTree = compareObjects(json1, json2);
  const tree = { type: 'tree', children: innerTree };
  return chooseFormatter(tree, formatName);
};

export default genDiff;
