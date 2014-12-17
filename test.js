var oop = require('./oop.js');

var Hoge = function () {
  this.member({
    mem: 'const'
  });
};
var Fuga = function () {
  this.member({ inst: 100 });
  console.dir(this);
};

oop.extend(Fuga);
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
    set: function (value) { console.log('"fuga" is "' + value + '"'); },
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

var fuga = new Fuga();
var hoge = new Hoge();

oop.mixin(hoge, {
  fuga: 'fugafuga',
});

for (var key in hoge) {
  console.log(key, hoge[key]);
}

