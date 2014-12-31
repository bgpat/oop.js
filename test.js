var assert = require('assert');
var util = require('util');

function passed () {
  console.log(' [\x1b[32mPASSED\x1b[39m]');
}

function failed () {
  console.log(' [\x1b[31mFAILED\x1b[39m]');
}

var oop = require('./oop.js');

var A = function () {};
var B = function () {};

util.print('testing "extend" method...');
try {
  oop.extend(A);
  assert.ok(A.prototype.extend);
  assert.ok(A.prototype.mixin);
  assert.ok(A.prototype.property);
  assert.ok(A.extend);
  assert.ok(A.property);
  A.prototype.hoge = 1;
  A.extend(B);
  assert.ok(B.prototype.extend);
  assert.ok(B.prototype.mixin);
  assert.ok(B.prototype.property);
  assert.ok(B.extend);
  assert.ok(B.property);
  assert.equal(B.prototype.hoge, 1);
  passed();
} catch (e) {
  failed();
  console.dir(e);
}

util.print('testing "mixin" method...');
try {
  var a = new A();
  a.mixin({
    hoge: 2,
    fuga: 3,
    piyo: 4
  }, {
    piyo: 5
  });
  assert.equal(a.hoge, 2);
  assert.equal(a.fuga, 3);
  assert.equal(a.piyo, 5);
  passed();
} catch (e) {
  failed();
  console.dir(e);
}

util.print('testing "property" method...');
try {
  var b1 = new B();
  B.property({
    fuga: 2,
    piyo: 3
  });
  var b2 = new B();
  assert.equal(b1.fuga, 2);
  assert.equal(b2.fuga, 2);
  assert.equal(b2.piyo, 3);
  b2.piyo = 4;
  assert.equal(b2.piyo, 4);
  b1.property({
    hoge: 5,
    fuga: 6
  });
  assert.equal(b1.hoge, 5);
  assert.equal(b1.fuga, 6);
  assert.equal(b2.hoge, 1);
  assert.equal(b2.fuga, 2);
  passed();
} catch (e) {
  failed();
  console.dir(e);
}

