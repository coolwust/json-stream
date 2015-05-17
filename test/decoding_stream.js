'use strict';

var JsonDecodingStream = require('../lib/decoding_stream.js');
var JsonEncodingStream = require('../lib/encoding_stream.js');
var assert = require('assert');

describe('JsonDecodingStream', function () {
  it('stream should be created successfully.', function (done) {
    var encodingStream = new JsonEncodingStream();
    var decodingStream = new JsonDecodingStream();

    var obj1 = {
      name: 'Xianghan Wang',
      gender: 'male',
      hobby: ['programming', 'playing piano']
    };
    var obj2 = {
      name: 'Liying Xu',
      gender: 'female',
      hobby: ['programming', 'reading']
    };
    
    encodingStream.pipe(decodingStream);
    encodingStream.write(obj1);
    encodingStream.write(obj2);
    encodingStream.end();

    decodingStream.on('readable', function () {
      var chunk = null;
      while ((chunk = decodingStream.read()) !== null) {
        assert(typeof chunk === 'object');
      }
    });
    decodingStream.on('end', function () {
      done();
    });
  });
});
