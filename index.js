/**
 * @file Object Oriented Programming Library for Javascript
 *
 * @author bgpat <bgpat@bgpat.net>
 * @license MIT
 * @version 1.0.1, 2014-12-06
 */

/** @namespace */
var oop = {
  /**
   * inherit super class
   * @param {Function} child sub class
   * @param {Function} parent super class
   * @example oop.extend(ChildClass, ParentClass);
   */
  extend: function (child, parent) {
    child.prototype = Object.create(
      parent.prototype,
      { constructor: { value: child } }
    );
  },

  /**
   * define member variables
   * @param {Object} obj target object
   * @param {...Object} members member list
   * @example oop.member(Foo.prototype, {
   *    foo: 'foo is public member',
   *    _bar: '_bar is private member',
   *  });
   */
  member: function (obj, members) {
    for (var name in members) {
      Object.defineProperty(obj, name, {
        enumerable: name.charAt(0) !== '_',
        value: members[name],
        writable: true,
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
   *      set: function (value) { this._foo = value; },
   *    },
   *    _bar: {
   *      get: function () { return '_bar is private and readonly property',
   *    }
   *  });
   */
  property: function (obj, properties) {
    for (var name in properties) {
      Object.defineProperty(obj, name, {
        enumerable: name.charAt(0) !== '_',
        get: properties[name].get,
        set: properties[name].set,
      });
    }
    recurse(arguments);
  },

  /**
   * define methods
   * @param {Object} obj target object
   * @param {...Object.<Function>} methods method list
   * @example oop.method(Foo.prototype, {
   *    foo: function () { return 'foo is a public method'; },
   *    _bar: function () { return 'bar is a private method'; },
   *  });
   */
  method: function (obj, methods) {
    for (var name in methods) {
      Object.defineProperty(obj, name, {
        enumerable: name.charAt(0) !== '_',
        value: methods[name],
      });
    }
    recurse(arguments);
  },

  /**
   * @typedef {Object.<Function>} oop.Property
   * @property {Function} [get] getter
   * @property {Function} [set] setter
   */
};

function recurse (args) {
  list = Array.prototype.slice.call(args);
  if (list.length > 2) {
    list.splice(1, 1);
    args.callee.apply(null, list);
  }
}

module.exports = oop;

