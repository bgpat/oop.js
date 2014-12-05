/**
 * @file test.js
 *
 * @author bgpat <bgpat@bgpat.net>
 * @license MIT
 * @version 1.0.1, 2014-12-06
 */

var oop = require('./index.js');

var Hoge = function () {};
var Fuga = function () {};

oop.extend(Hoge, Fuga);

oop.member(Hoge.prototype, {
  hoge: 'hoge',
  _hoge: '_hoge',
}, {
  hogehoge: 'hogehoge',
});

oop.property(Fuga.prototype, {
  fuga: {
    get: function () { return 'fuga'; },
  },
  _fuga: {
    get: function () { return '_fuga'; },
  },
});

oop.method(Hoge.prototype, {
  piyo: function () {
    return 'piyo';
  },
  _piyo: function () {
    return '_piyo';
  },
});

var hoge = new Hoge();
for (var key in hoge) {
  console.log(key, hoge[key]);
}

