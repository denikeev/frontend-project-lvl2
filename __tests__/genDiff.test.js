import { getFixturePath, readFile } from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

test('genDiff', () => {
  const result = readFile('../__fixtures__/result.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});
