import genDiff from '../src/genDiff.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const filepath1 = '__tests__/files/file1.json';
const filepath2 = '__tests__/files/file2.json';

test('genDiff', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
