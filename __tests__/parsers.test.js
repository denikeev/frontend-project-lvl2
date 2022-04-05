import { getFixturePath, readFile } from '../src/test-helpers.js';
import getJson from '../src/parsers.js';

const jsonFile = JSON.parse(readFile('file1.json'));
const file1Path = getFixturePath('file1.json');
const file2Path = getFixturePath('file1.yml');
const file3Path = getFixturePath('test_extension.txt');

test('getJson', () => {
  expect(getJson(file1Path)).toEqual(jsonFile);
  expect(getJson(file2Path)).toEqual(jsonFile);
});

test('extension', () => {
  expect(getJson(file3Path)).toBeNull();
});
