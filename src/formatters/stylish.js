import _ from 'lodash';

const getValue = (value, depth, replacer = ' ', spaceCount = 2) => {
  const indentSize = spaceCount * depth;
  const nestedIndent = replacer.repeat(indentSize + spaceCount);
  const bracketIndent = replacer.repeat(indentSize - spaceCount);
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const nestedData = Object.entries(value).map(([key, val]) => `${nestedIndent}${key}: ${getValue(val, depth + 2)}`);
  return [
    '{',
    ...nestedData,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (currentData, depth = 1, replacer = ' ', spaceCount = 2) => {
    const indentSize = spaceCount * depth;
    const statusIndent = replacer.repeat(indentSize);
    const nestedIndent = replacer.repeat(indentSize + spaceCount);
    switch (currentData.type) {
      case 'internal': {
        const internalChildren = currentData.children.map((child) => iter(child, depth + 2)).join('\n');
        return `${statusIndent}  ${currentData.key}: {\n${internalChildren}\n${nestedIndent}}`;
      }
      case 'updated': {
        const oldValue = getValue(currentData.oldValue, depth + 2, replacer, spaceCount);
        const newValue = getValue(currentData.newValue, depth + 2, replacer, spaceCount);
        const deleted = `${statusIndent}- ${currentData.key}: ${oldValue}`;
        const added = `${statusIndent}+ ${currentData.key}: ${newValue}`;
        return `${deleted}\n${added}`;
      }
      case 'added': {
        const value = getValue(currentData.value, depth + 2, replacer, spaceCount);
        return `${statusIndent}+ ${currentData.key}: ${value}`;
      }
      case 'deleted': {
        const value = getValue(currentData.value, depth + 2, replacer, spaceCount);
        return `${statusIndent}- ${currentData.key}: ${value}`;
      }
      case 'unchanged': {
        return `${statusIndent}  ${currentData.key}: ${currentData.value}`;
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
