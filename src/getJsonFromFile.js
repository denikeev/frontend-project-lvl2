import path from 'path';
import fs from 'fs';

const getJsonFromFile = (filepath) => {
  const receivedPath = path.resolve(filepath);
  if (!fs.existsSync(receivedPath)
  || !fs.lstatSync(receivedPath).isFile()
  || path.extname(receivedPath) !== '.json') {
    return null;
  }
  const jsonString = fs.readFileSync(receivedPath, 'utf8');

  return JSON.parse(jsonString);
};

export default getJsonFromFile;
