import { getFixturePath, readFile } from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

let file1Path;
let file2Path;
beforeAll(() => {
  file1Path = getFixturePath('file1.json');
  file2Path = getFixturePath('file2.json');
});

test('genDiff main flow', () => {
  const result = readFile('../__fixtures__/formaters/stylish-result.txt');
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});

test('genDiff plain', () => {
  const result = readFile('../__fixtures__/formaters/plain-result.txt');
  expect(genDiff(file1Path, file2Path, 'plain')).toEqual(result);
});

test('genDiff json', () => {
  const result = readFile('../__fixtures__/formaters/json-result.txt');
  expect(genDiff(file1Path, file2Path, 'json')).toEqual(result);
});
