/**
 * @file Object Oriented Programming Library for Javascript
 *
 * @author bgpat <bgpat@bgpat.net>
 * @license MIT
 * @version 1.0.8, 2014-12-17
 */

function instance (func) {
  return function () {
    var args = [this].concat(Array.prototype.slice.call(arguments, 0));
    return func.apply(null, args);
  };
}

function recurse (args) {
  var list = Array.prototype.slice.call(args);
  if (list.length > 2) {
    list.splice(1, 1);
    args.callee.apply(null, list);
  }
}

/** @namespace */
var oop = {
  /**
   * inherit super class
   * @param {function()} child sub class
   * @param {function()} parent super class
   * @example oop.extend(ChildClass, ParentClass);
   */
  extend: function (child, parent) {
    if (parent == null) {
      parent = function () {};
    }
    child.prototype = Object.create(
      parent.prototype, {
        constructor: { value: child },
        member: {
          value: instance(oop.member),
          writable: true
        },
        property: {
          value: instance(oop.property),
          writable: true
        },
        method: {
          value: instance(oop.method),
          writable: true
        },
        mixin: {
          value: instance(oop.minxin),
          writable: true
        }
      }
    );
  },

  /**
   * define member variables
   * @param {Object} obj target object
   * @param {...Object} members member list
   * @example oop.member(Foo.prototype, {
   *    foo: 'foo is public member',
   *    _bar: '_bar is private member'
   *  });
   */
  member: function (obj, members) {
    for (var name in members) {
      Object.defineProperty(obj, name, {
        enumerable: name.charAt(0) !== '_',
        value: members[name],
        writable: true
      });
    }
    recurse(arguments);
  },

  /**
   * define properties
   * @param {Object} obj target object
   * @param {...Object.<oop.Property>} properties property list
   * @example oop.property(Foo.prototype, {
   *    foo: {
   *      get: function () { return 'foo is public property'; },
   *      set: function (value) { this._foo = value; }
   *    },
   *    _bar: {
   *      get: function () { return '_bar is private and readonly property'
   *    }
   *  });
   */
  property: function (obj, properties) {
    for (var name in properties) {
      Object.defineProperty(obj, name, {
        enumerable: name.charAt(0) !== '_',
        get: properties[name].get,
        set: properties[name].set
      });
    }
    recurse(arguments);
  },

  /**
   * define methods
   * @param {Object} obj target object
   * @param {...Object.<function()>} methods method list
   * @example oop.method(Foo.prototype, {
   *    foo: function () { return 'foo is a public method'; },
   *    _bar: function () { return 'bar is a private method'; }
   *  });
   */
  method: function (obj, methods) {
    for (var name in methods) {
      Object.defineProperty(obj, name, {
        enumerable: name.charAt(0) !== '_',
        value: methods[name]
      });
    }
    recurse(arguments);
  },

  /**
   * mixin object
   * @param {Object} target target object
   * @param {...Object} list object list
   * @example oop.mixin(foo, { bar: 'bar' });
   */
  mixin: function (target, list) {
    for (var name in list) {
      target[name] = list[name];
    }
    recurse(arguments);
  }

  /**
   * @typedef {Object.<function()>} oop.Property
   * @property {function()} [get] getter
   * @property {function()} [set] setter
   */
};

module.exports = oop;

