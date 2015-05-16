'use strict';

var JsonEncodingStream = require('../lib/encoding_stream.js');
var assert = require('assert');

describe('JsonEncodingStream', function () {
  it('JSON object should be encoded to string', function (done) {
    var me = {
      name: "Xianghan Wang",
      age: 26,
      hobby: ["programming", "playing piano", "reading"]
    };
    var stream = new JsonEncodingStream();
    stream.write(me);
    stream.end();
    var chunk = '';
    var data = '';
    stream.on('readable', function () {
      while ((chunk = stream.read()) !== null) {
        data += chunk.toString('utf8');
      }
    });
    stream.on('end', function () {
      assert(data.length > 10);
      assert.equal(JSON.stringify(me), data.slice(0, -1));
      done();
    });
  });
});
