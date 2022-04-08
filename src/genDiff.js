import _ from 'lodash';
import getJson from './parsers.js';

const stylish = (data) => {
  const status = (obj) => {
    if (obj.type === 'added') return '+ ';
    if (obj.type === 'deleted') return '- ';
    return '  ';
  };
  const iter = (currentData, depth = 1) => {
    const spaceCount = 2;
    const indentSize = spaceCount * depth;
    const replacer = ' ';
    const statusIndent = replacer.repeat(indentSize);
    const nestedIndent = replacer.repeat(indentSize + 2);
    const bracketIndent = replacer.repeat(indentSize - 2);
    if (!_.isObject(currentData)) {
      return `${currentData}`;
    }
    if (currentData.type === 'internal' && currentData.keyName === '/') {
      const children = currentData.children.map((child) => iter(child));
      return [
        '{',
        ...children,
        '}',
      ].join('\n');
    }
    if (currentData.type !== 'internal') {
      if (currentData.keyName) {
        return `${statusIndent}${status(currentData)}${currentData.keyName}: ${iter(currentData.value, depth + 2)}`;
      }
      const nestedData = Object.entries(currentData).map(([key, val]) => `${nestedIndent}${key}: ${iter(val, depth + 2)}`);
      return [
        '{',
        ...nestedData,
        `${bracketIndent}}`,
      ].join('\n');
    }
    const internalChildren = currentData.children.map((child) => iter(child, depth + 2)).join('\n');
    return `${statusIndent}${status(currentData)}${currentData.keyName}: {\n${internalChildren}\n${nestedIndent}}`;
  };

  return iter(data);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const json1 = getJson(filepath1);
  const json2 = getJson(filepath2);

  const iter = (obj1, obj2) => {
    const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
    const sortedKeys = _.sortBy(commonKeys);

    const tree = sortedKeys.flatMap((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const isDeleted = () => Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key);
      const isAdded = () => !Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key);
      const isObjects = () => _.isObject(value1) && _.isObject(value2);
      const isDifferent = () => value1 !== value2;

      if (isDeleted()) return { keyName: key, value: value1, type: 'deleted' };
      if (isAdded()) return { keyName: key, value: value2, type: 'added' };
      if (isObjects()) return { keyName: key, type: 'internal', children: iter(value1, value2) };
      if (isDifferent()) return [{ keyName: key, value: value1, type: 'deleted' }, { keyName: key, value: value2, type: 'added' }];
      return { keyName: key, value: value1 };
    });

    return tree;
  };

  const innerTree = iter(json1, json2);
  const tree = { keyName: '/', type: 'internal', children: innerTree };
  // console.log('innerTree', JSON.stringify(tree, null, 2));
  if (formatter === 'stylish') {
    return stylish(tree);
  }
  return null;
};

export default genDiff;
