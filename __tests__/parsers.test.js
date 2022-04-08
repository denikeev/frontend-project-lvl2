import getJson, {
  getFixturePath, readFile, __dirname, getPath,
} from '../src/parsers.js';

describe('getJson', () => {
  const jsonFile = JSON.parse(readFile('file1.json'));
  const jsonPath = getFixturePath('file1.json');
  const ymlPath = getFixturePath('file1.yml');
  const txtPath = getFixturePath('test_extension.txt');
  test('main', () => {
    expect(getJson(jsonPath)).toEqual(jsonFile);
    expect(getJson(ymlPath)).toEqual(jsonFile);
  });
  test('extension', () => {
    expect(getJson(txtPath)).toBeNull();
  });
});

describe('getPath', () => {
  const file1Path = getFixturePath('file1.json');
  const nonExistentFile = getFixturePath('nonExistentFile.json');
  test('main', () => {
    expect(getPath(file1Path)).toEqual(file1Path);
  });
  test('exists', () => {
    expect(getPath(nonExistentFile)).toBeNull();
  });
  test('lstat', () => {
    expect(getPath(__dirname)).toBeNull();
  });
});
