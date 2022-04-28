import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
