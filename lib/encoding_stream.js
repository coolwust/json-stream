'use strict';

var Transform = require('stream').Transform;

function JsonEncodingStream() {
  var options = {
    allowHalfOpen: true,
    readableObjectMode: false,
    writableObjectMode: true
  };
  Transform.call(this, options);
}

function _transform(chunk, encoding, done) {
  var string = new Buffer(JSON.stringify(chunk)).toString('base64') + '\n';
  this.push(string);
  done();
}

function _flush(done) {
  this.push(null);
  done();
}

var properties = {
  constructor: {
    value: JsonEncodingStream,
    writable: true,
    configurable: true,
    enumerable: false
  }
}
JsonEncodingStream.prototype = Object.create(Transform.prototype, properties);
JsonEncodingStream.prototype._transform = _transform;
JsonEncodingStream.prototype._flush = _flush;
module.exports = JsonEncodingStream;
