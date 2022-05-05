import _ from 'lodash';

const getValue = (value, depth, replacer = ' ', spaceCount = 4) => {
  const indentSize = spaceCount * depth;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spaceCount);
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const nestedData = Object.entries(value).map(([key, val]) => `${currentIndent}${key}: ${getValue(val, depth + 1)}`);
  return [
    '{',
    ...nestedData,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (currentData, depth = 1, replacer = ' ', spaceCount = 2) => {
    const indentSize = spaceCount * depth;
    const currentIndent = replacer.repeat(indentSize * spaceCount);
    const statusIndent = replacer.repeat((indentSize * spaceCount) - spaceCount);
    switch (currentData.type) {
      case 'internal': {
        const internalChildren = currentData.children.map((child) => iter(child, depth + 1)).join('\n');
        return `${currentIndent}${currentData.key}: {\n${internalChildren}\n${currentIndent}}`;
      }
      case 'updated': {
        const oldValue = getValue(currentData.oldValue, depth + 1, replacer);
        const newValue = getValue(currentData.newValue, depth + 1, replacer);
        const deleted = `${statusIndent}- ${currentData.key}: ${oldValue}`;
        const added = `${statusIndent}+ ${currentData.key}: ${newValue}`;
        return `${deleted}\n${added}`;
      }
      case 'added': {
        const value = getValue(currentData.value, depth + 1, replacer);
        return `${statusIndent}+ ${currentData.key}: ${value}`;
      }
      case 'deleted': {
        const value = getValue(currentData.value, depth + 1, replacer);
        return `${statusIndent}- ${currentData.key}: ${value}`;
      }
      case 'unchanged': {
        return `${currentIndent}${currentData.key}: ${currentData.value}`;
      }
      default: throw new Error(`Unacceptable currentData.type: '${currentData.type}'!`);
    }
  };

  const tree = data.map((child) => iter(child));
  const result = [
    '{',
    ...tree,
    '}',
  ].join('\n');
  return result;
};

export default stylish;
