import path from 'path';
import { existsSync, lstatSync } from 'fs';

const getPath = (filepath) => {
  const receivedPath = path.resolve(filepath);
  if (existsSync(receivedPath) && lstatSync(receivedPath).isFile()) {
    return receivedPath;
  }
  return null;
};

export default getPath;
