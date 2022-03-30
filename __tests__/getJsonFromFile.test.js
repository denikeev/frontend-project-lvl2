import { cwd } from 'process';
import getJsonFromFile from '../src/getJsonFromFile.js';

const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

describe('paths option', () => {
  test('absolute path', () => {
    expect(getJsonFromFile(`${cwd()}/__tests__/files/file1.json`)).toEqual(file1);
  });
  test('relative path', () => {
    expect(getJsonFromFile('__tests__/files/file1.json')).toEqual(file1);
  });
});

describe('to be null', () => {
  test('exists', () => {
    expect(getJsonFromFile(`${cwd()}/__tests__/nothing.json`)).toBeNull();
  });
  test('extension', () => {
    expect(getJsonFromFile(`${cwd()}README.md`)).toBeNull();
  });
  test('lstat', () => {
    expect(getJsonFromFile('__tests__')).toBeNull();
  });
});
