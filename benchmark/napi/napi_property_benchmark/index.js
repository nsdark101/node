'use strict';
const common = require('../../common.js');
const {
  createStringLatin1,
  createStringUtf8,
  createStringUtf16,
} = require('./build/Release/napi_property_benchmark.node');
const bench = common.createBenchmark(main, {
  n: [1e6], // Number of iterations
});

function main({ n }) {
  bench.start();
  createStringLatin1(
    n,
    () => {},
    () => {},
    () => {},
  );
  createStringUtf8(
    n,
    () => {},
    () => {},
    () => {},
  );
  createStringUtf16(
    n,
    () => {},
    () => {},
    () => {},
  );
  bench.end(n);
}
