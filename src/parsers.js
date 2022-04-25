import path, { dirname } from 'path';
import { existsSync, lstatSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

export const processPath = (filepath) => {
  const receivedPath = path.resolve(filepath);
  if (!existsSync(receivedPath)) {
    throw new Error(`Path '${receivedPath}' is not exist!`);
  }
  if (!lstatSync(receivedPath).isFile()) {
    throw new Error(`Not a file at the given path '${receivedPath}'`);
  }
  return receivedPath;
};

const parse = (format, data) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(data);
  }
  return null;
};

const getJson = (filepath) => {
  const processedPath = processPath(filepath);
  const content = readFileSync(processedPath, 'utf-8');
  const format = path.extname(processedPath);
  const json = parse(format, content);

  return json;
};

export default getJson;
