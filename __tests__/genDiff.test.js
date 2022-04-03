import { getFixturePath } from '../src/test-helpers.js';
import genDiff from '../src/genDiff.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const file1Path = getFixturePath('file1.json');
const file2Path = getFixturePath('file2.json');

test('genDiff', () => {
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});
