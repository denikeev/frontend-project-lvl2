import path, { dirname } from 'path';
import { existsSync, lstatSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const makeYamltoJson = (filepath) => yaml.load(readFileSync(filepath, 'utf8'));
const makeJson = (filepath) => JSON.parse(readFileSync(filepath, 'utf8'));

export const getPath = (filepath) => {
  const receivedPath = path.resolve(filepath);
  if (existsSync(receivedPath) && lstatSync(receivedPath).isFile()) {
    return receivedPath;
  }
  return null;
};

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
