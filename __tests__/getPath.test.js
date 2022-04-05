import { getFixturePath, __dirname } from '../src/test-helpers.js';
import getPath from '../src/getPath.js';

const file1Path = getFixturePath('file1.json');
const nonExistentFile = getFixturePath('nonExistentFile.json');

test('getPath', () => {
  expect(getPath(file1Path)).toEqual(file1Path);
});

describe('to be null', () => {
  test('exists', () => {
    expect(getPath(nonExistentFile)).toBeNull();
  });
  test('lstat', () => {
    expect(getPath(__dirname)).toBeNull();
  });
});
