import getJson, {
  getFixturePath, readFile, processPath,
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

describe('processPath', () => {
  const file1Path = getFixturePath('file1.json');
  test('main', () => {
    expect(processPath(file1Path)).toEqual(file1Path);
  });
});
