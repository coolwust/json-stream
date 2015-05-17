'use strict';

var Transform = require('stream').Transform;

function JsonDecodingStream() {
  var options = {
    allowHalfOpen: true,
    readableObjectMode: true,
    writableObjectMode: false
  }
  Transform.call(this, options);
  this.tmp = '';
}

function _transform(chunk, encoding, done) {
  var self = this;
  var arr = chunk.toString().split('\n');
  if (arr.length === 1) {
    this.tmp += arr[0];
  } else {
    arr[0] += this.tmp;
    this.tmp = arr.pop();
    arr.forEach(function (element) {
      var buffer = new Buffer(element, 'base64');
      var str = buffer.toString();
      var obj = JSON.parse(str);
      self.push(obj);
    });
  }
  console.log('hehe');
  done();
}

function _flush(done) {
  if (this.tmp !== '') {
    this.push(null);
    done(new Error(this.tmp));
  } else {
    this.push(null);
    done();
  }
}

var properties = {
  constructor: {
    value: JsonDecodingStream,
    writable: true,
    configurable: true,
    enumerable: false
  }
}
JsonDecodingStream.prototype = Object(Transform.prototype, properties);
JsonDecodingStream.prototype._transform = _transform;
JsonDecodingStream.prototype._flush = _flush;
module.exports = JsonDecodingStream;
