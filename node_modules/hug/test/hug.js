var assert = require('assert');
var hug = require('../hug');

var asyncFunction = function(callback) {
  callback();
};

var syncFunction = function() {
};

var beforeCt = 0;
var afterCt = 0;

var before = function() {
  beforeCt++;
};
var after = function(start, duration) {
  afterCt++;
}

describe('Instrument API', function() {
  var newFunction = null;
  it('wrap a synchronous function with before and after functions', function() {
    newFunction = hug(syncFunction, null, before, after);
    assert.notEqual(newFunction, syncFunction);
  });

  it('call the returned function', function() {
    newFunction();
    assert.equal(beforeCt, 1);
    assert.equal(afterCt, 1);
  });

  it('wrap an asynchronous function with before and after functions', function() {
    newFunction = hug(asyncFunction, null, before, after);
    assert.notEqual(newFunction, asyncFunction);
  });

  it('call the new function and ensure it called the before and after functions', function(done) {
    newFunction(function() {
      assert.equal(beforeCt, 2);
      assert.equal(afterCt, 2);
      done();
    });
  });
});

