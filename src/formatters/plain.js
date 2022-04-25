import _ from 'lodash';

const filterType = (data) => {
  const children = data.children
    .map((child) => {
      if (child.type === 'internal') {
        return filterType(child);
      }
      return child;
    })
    .filter((child) => child.type && child.type !== 'unchanged');
  return { ...data, children };
};

const formatValue = (val) => {
  if (_.isObject(val)) return '[complex value]';
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const getObjectQuery = (objectQuery, addKey = '') => `${objectQuery}${addKey}`.substring(1);

const plain = (data) => {
  const clonedData = _.cloneDeep(data);
  const filteredTree = filterType(clonedData);

  const iter = (currentData, objectName = '') => {
    const objectQuery = `${objectName}.${currentData.key ?? ''}`;
    if (!_.isObject(currentData)) {
      return `${currentData}`;
    }
    if (currentData.type === 'tree') {
      const children = currentData.children.map((child) => iter(child)).join('\n');
      return children;
    }
    if (currentData.type === 'updated') {
      const [deletedData] = currentData.children;
      const [, addedData] = currentData.children;
      const deletedValue = formatValue(deletedData.value);
      const addedValue = formatValue(addedData.value);
      return `Property '${getObjectQuery(objectQuery, deletedData.key)}' was updated. From ${deletedValue} to ${addedValue}`;
    }
    if (currentData.type === 'added') {
      return `Property '${getObjectQuery(objectQuery)}' was added with value: ${formatValue(currentData.value)}`;
    }
    if (currentData.type === 'deleted') {
      return `Property '${getObjectQuery(objectQuery)}' was removed`;
    }
    const internalChildren = currentData.children.map((child) => iter(child, objectQuery)).join('\n');
    return internalChildren;
  };

  return iter(filteredTree);
};
export default plain;
