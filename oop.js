/**
 * @file オブジェクト指向プログラミング用ユーティリティ
 * @author bgpat <bgpat@bgpat.net>
 * @license MIT
 * @version 1.1.0, 2014-12-31
 */

/* (argumentsなどを)配列に変換する */
function toArray (obj, from, to) {
  return Array.prototype.slice.call(obj, from, to);
}

/**
 * extendを呼び出したときに継承されるクラス
 * @class
 */
var OOP = function () {
  var mixin = this.mixin;
  this.mixin = function () {
    var args = toArray(arguments);
    var dest = args.shift() || {};
    mixin.apply(dest, args);
    return dest;
  };
};

/**
 * プロトタイプを指定したクラスに継承させる<br>
 * メンバーが未定義の場合はextend/propertyのstaticメソッドを追加する
 * @param {Function()} child 継承先クラス
 * @param {Function()} [parent=this.constructor] 継承元クラス
 */
OOP.prototype.extend = function (child, parent) {
  if (arguments.length <= 1) {
    parent = this.constructor;
  }
  child.prototype = Object.create(parent.prototype, {
    constructor: { value: child }
  });
  if (typeof child.extend === 'undefined') {
    child.extend = OOP.prototype.extend.bind(new child());
  }
  if (typeof child.property === 'undefined') {
    child.property = OOP.prototype.property.bind(child.prototype);
  }
};

/**
 * 引数に指定されたオブジェクトをthisにマージする
 * @param {object} [obj...] マージするオブジェクト
 */
OOP.prototype.mixin = function () {
  var args = toArray(arguments);
  var obj = args.shift();
  for (var i in obj) {
    this[i] = obj[i];
  }
  if (args.length > 0) {
    arguments.callee.apply(this, args);
  }
};

/**
 * プロパティを設定する
 * <ul>
 * <li>_から始まるプロパティ: protected</li>
 * <li>get/setから始まるプロパティ: getter/setter</li>
 * </ul>
 * @param {object} props ハッシュ形式で設定するプロパティを指定
 */
OOP.prototype.property = function (props) {
  var desc = {};
  for (var i in props) {
    var m = i.match(/^(_)?(?:([gs]et)([A-Z]))?(.*)$/);
    var name = (m[3] || '').toLowerCase() + m[4];
    if (!m[2]) {
      desc[name] = {
        enumerable: true,
        writable: !m[1]
      };
    } else {
      desc[name] = {};
    }
    desc[name][m[2] || 'value'] = props[i];
  }
  Object.defineProperties(this, desc);
};

module.exports = new OOP();

