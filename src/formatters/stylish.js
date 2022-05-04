import _ from 'lodash';

const getValue = (value, depth, replacer = ' ', spaceCount = 4) => {
  const indentSize = spaceCount * depth;
  // console.log(indentSize);
  // console.log(value, depth, spaceCount, indentSize);
  const currentIndent = replacer.repeat(indentSize);
  // const nestedIndent = replacer.repeat(indentSize + spaceCount);
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
    const statusIndent = replacer.repeat((indentSize * spaceCount) - 2);
    // const nestedIndent = replacer.repeat(indentSize + spaceCount);
    const internalIndent = replacer.repeat(indentSize * spaceCount);
    switch (currentData.type) {
      case 'internal': {
        const internalChildren = currentData.children.map((child) => iter(child, depth + 1)).join('\n');
        return `${internalIndent}${currentData.key}: {\n${internalChildren}\n${internalIndent}}`;
      }
      case 'updated': {
        const oldValue = getValue(currentData.oldValue, depth + 1, replacer);
        const newValue = getValue(currentData.newValue, depth + 1, replacer, spaceCount);
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
        return `${internalIndent}${currentData.key}: ${currentData.value}`;
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
