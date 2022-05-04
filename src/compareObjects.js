import _ from 'lodash';

const compareObjects = (obj1, obj2) => {
  const commonKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(commonKeys);

  const tree = sortedKeys.flatMap((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const isDeleted = () => _.has(obj1, key) && !_.has(obj2, key);
    const isAdded = () => !_.has(obj1, key) && _.has(obj2, key);
    const isPlainObject = () => (_.isObject(value1) && _.isObject(value2))
    && !(Array.isArray(value1) && Array.isArray(value2));
    const isDifferent = () => value1 !== value2;

    if (isDeleted()) return { key, value: value1, type: 'deleted' };
    if (isAdded()) return { key, value: value2, type: 'added' };
    if (isPlainObject()) return { key, type: 'internal', children: compareObjects(value1, value2) };
    if (isDifferent()) {
      return {
        key, type: 'updated', oldValue: value1, newValue: value2,
      };
    }
    return { key, value: value1, type: 'unchanged' };
  });

  return tree;
};

export default compareObjects;
