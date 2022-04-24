import _ from 'lodash';

const json = (data) => {
  const clonedData = _.cloneDeep(data);
  const stringify = JSON.stringify(clonedData);
  return stringify;
};

export default json;
