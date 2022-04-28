import { readFile } from '../src/fixtureFs.js';
import parse from '../src/parsers.js';

test('parse', () => {
  const data1 = parse('.json', readFile('file1.json'));
  const data2 = parse('.yml', readFile('file1.yml'));
  expect(data1).toEqual(data2);
});
