'use strict';

const common = require('../../common.js');
const bench = common.createBenchmark(main, {
  method: ['create_property_key_utf8', 'create_property_key_latin1'],
  n: [1e6],
});

function main({ method, n }) {
  const {
    node_api_create_property_key_utf8,
    node_api_create_property_key_latin1,
  } = require('./build/Release/test_napi.node');

  const key = 'exampleKey';
  const buffer = Buffer.from(key, 'utf8');

  bench.start();
  for (let i = 0; i < n; i++) {
    if (method === 'create_property_key_utf8') {
      node_api_create_property_key_utf8(buffer);
    } else if (method === 'create_property_key_latin1') {
      node_api_create_property_key_latin1(buffer);
    }
  }
  bench.end(n);
}
