import path from 'path';
import { readFileSync } from 'fs';

const readFile = (filepath) => {
  const receivedPath = path.resolve(filepath);
  return readFileSync(receivedPath, 'utf-8');
};

export default readFile;
