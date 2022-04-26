import { getFixturePath, readFile } from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

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
