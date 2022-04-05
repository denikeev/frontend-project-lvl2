import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';
import getPath from './getPath.js';

const makeYamltoJson = (filepath) => yaml.load(readFileSync(filepath, 'utf8'));
const makeJson = (filepath) => JSON.parse(readFileSync(filepath, 'utf8'));

const getJson = (filepath) => {
  const receivedPath = getPath(filepath);
  const format = path.extname(receivedPath);
  if (format === '.json') {
    return makeJson(receivedPath);
  }
  if (format === '.yaml' || format === '.yml') {
    return makeYamltoJson(receivedPath);
  }

  return null;
};

export default getJson;
