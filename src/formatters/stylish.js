import _ from 'lodash';

const stylish = (data) => {
  const clonedData = _.cloneDeep(data);
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
    if (currentData.type === 'tree') {
      const children = currentData.children.map((child) => iter(child));
      return [
        '{',
        ...children,
        '}',
      ].join('\n');
    }
    if (currentData.type === 'updated') {
      return currentData.children.map((child) => iter(child, depth)).join('\n');
    }
    if (currentData.type !== 'internal') {
      if (currentData.type) {
        return `${statusIndent}${status(currentData)}${currentData.key}: ${iter(currentData.value, depth + 2)}`;
      }
      const nestedData = Object.entries(currentData).map(([key, val]) => `${nestedIndent}${key}: ${iter(val, depth + 2)}`);
      return [
        '{',
        ...nestedData,
        `${bracketIndent}}`,
      ].join('\n');
    }
    const internalChildren = currentData.children.map((child) => iter(child, depth + 2)).join('\n');
    return `${statusIndent}${status(currentData)}${currentData.key}: {\n${internalChildren}\n${nestedIndent}}`;
  };

  return iter(clonedData);
};

export default stylish;
