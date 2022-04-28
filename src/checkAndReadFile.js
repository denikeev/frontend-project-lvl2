import path from 'path';
import { readFileSync, existsSync, lstatSync } from 'fs';

const checkAndReadFile = (filepath) => {
  const receivedPath = path.resolve(filepath);
  if (!existsSync(receivedPath)) {
    throw new Error(`Path '${receivedPath}' is not exist!`);
  }
  if (!lstatSync(receivedPath).isFile()) {
    throw new Error(`Not a file at the given path '${receivedPath}'`);
  }
  return readFileSync(receivedPath, 'utf-8');
};

export default checkAndReadFile;
