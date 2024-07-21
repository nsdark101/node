'use strict';
const common = require('../../common.js');

let binding;
try {
  binding = require(`./build/${common.buildType}/napi_property_benchmark.node`);
} catch {
  console.error(`${__filename}: Binding failed to load`);
  process.exit(1);
}

const bench = common.createBenchmark(main, {
  n: [1e5, 1e6, 1e7],
  stringType: ['Latin1', 'Utf8', 'Utf16'],
});

function main({ n, stringType }) {
  const createStringFunc = binding[`createString${stringType}`];
  if (typeof createStringFunc !== 'function') {
    console.error(`Function createString${stringType} is not defined.`);
    process.exit(1);
  }
  createStringFunc(n, bench, bench.start, bench.end);
}
