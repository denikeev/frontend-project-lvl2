import _ from 'lodash';

const formatValue = (val) => {
  if (_.isObject(val)) return '[complex value]';
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const getObjectQuery = (coll) => coll.join('.');

const plain = (data) => {
  const iter = (currentData, objectName = []) => {
    const objectQuery = _.flatten([objectName, currentData.key]);
    switch (currentData.type) {
      case 'internal': {
        const children = currentData.children.flatMap((child) => iter(child, objectQuery)).join('\n');
        return children;
      }
      case 'updated': {
        return `Property '${getObjectQuery(objectQuery)}' was updated. From ${formatValue(currentData.oldValue)} to ${formatValue(currentData.newValue)}`;
      }
      case 'added': {
        return `Property '${getObjectQuery(objectQuery)}' was added with value: ${formatValue(currentData.value)}`;
      }
      case 'deleted': {
        return `Property '${getObjectQuery(objectQuery)}' was removed`;
      }
      case 'unchanged': return [];
      default: throw new Error(`Unacceptable currentData.type: '${currentData.type}'!`);
    }
  };

  const result = data.map((child) => iter(child)).join('\n');
  return result;
};

export default plain;
