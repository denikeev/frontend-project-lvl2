import { getFixturePath, readFile, __dirname } from '../src/test-helpers.js';
import getJsonFromFile from '../src/getJsonFromFile.js';

const expectedFile = JSON.parse(readFile('expected_file.json'));
const file1Path = getFixturePath('file1.json');
const nonExistentFile = getFixturePath('nonExistentFile.json');
const otherExtension = getFixturePath('test_extension.txt');

test('getJsonFromFile', () => {
  expect(getJsonFromFile(file1Path)).toEqual(expectedFile);
});

describe('to be null', () => {
  test('exists', () => {
    expect(getJsonFromFile(nonExistentFile)).toBeNull();
  });
  test('extension', () => {
    expect(getJsonFromFile(otherExtension)).toBeNull();
  });
  test('lstat', () => {
    expect(getJsonFromFile(__dirname)).toBeNull();
  });
});
