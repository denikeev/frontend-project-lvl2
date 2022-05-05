import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['stylish', readFile('formaters/stylish-result.txt')],
  ['plain', readFile('formaters/plain-result.txt')],
  ['json', readFile('formaters/json-result.txt')],
];

test.each(cases)('%s format', (arg, expected) => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), arg)).toEqual(expected);
});
