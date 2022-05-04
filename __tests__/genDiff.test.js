import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff main flow', () => {
  const result = readFile('../__fixtures__/formaters/stylish-result.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});

test('genDiff plain', () => {
  const result = readFile('../__fixtures__/formaters/plain-result.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(genDiff(file1Path, file2Path, 'plain')).toEqual(result);
});

test('genDiff json', () => {
  const result = readFile('../__fixtures__/formaters/json-result.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(genDiff(file1Path, file2Path, 'json')).toEqual(result);
});
