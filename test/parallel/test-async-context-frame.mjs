import '../common/index.mjs';
import { opendir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { sep } from 'node:path';

const execFilePromise = promisify(execFile);

const testRunner = fileURLToPath(
  new URL('../../tools/test.py', import.meta.url)
);

const setNames = ['async-hooks', 'parallel'];

// Get all test names for each set
const testSets = await Promise.all(setNames.map(async (name) => {
  const path = fileURLToPath(new URL(`../${name}`, import.meta.url));
  const dir = await opendir(path);

  const tests = [];
  for await (const entry of dir) {
    if (entry.name.startsWith('test-async-local-storage-')) {
      tests.push(entry.name);
    }
  }

  return {
    name,
    tests
  };
}));

// Merge test sets with set name prefix
const tests = testSets.reduce((m, v) => {
  for (const test of v.tests) {
    m.push(`${v.name}${sep}${test}`);
  }
  return m;
}, []);

describe('AsyncContextFrame', {
  concurrency: tests.length
}, () => {
  for (const test of tests) {
    it(test, async () => {
      await execFilePromise(testRunner, [
        '--node-args=--async-context-frame',
        test,
      ]);
    });
  }
});
