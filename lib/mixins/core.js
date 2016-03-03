'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  suitSetObject: function suitSetObject(base, flags) {
    var obj = {};
    obj[base] = true;
    for (var name in flags) {
      obj[base + '--' + name] = flags[name];
    }
    return obj;
  },

  suitSet: function suitSet(base, flags) {
    return this.classSet(this.suitSetObject(base, flags));
  },

  getPropsWithout: function getPropsWithout() {
    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
      names[_key] = arguments[_key];
    }

    return _underscore2.default.omit(this.props, names);
  },

  classSet: function classSet(flags) {
    var classNames = [];
    for (var name in flags) {
      if (flags[name]) {
        classNames.push(name);
      }
    }
    return classNames.join(' ');
  },

  cx: function cx() {
    this.classSet.apply(this, arguments);
  },

  getClassSetObjectFromClassName: function getClassSetObjectFromClassName(className) {
    var obj = {};
    className.split(' ').forEach(function (name) {
      obj[name.trim()] = true;
    });
    return obj;
  },

  classAdd: function classAdd(flags) {
    var obj = this.getClassSetObjectFromClassName(this.props.className || '');
    _underscore2.default.extend(obj, flags);
    return this.classSet(obj);
  },

  mapChildren: function mapChildren(fn) {
    return _react2.default.Children.map(this.props.children, fn);
  },

  getNormalizedChildren: function getNormalizedChildren() {
    console.warn('Core mixin method `getNormalizedChildren` is deprecated. Please use `mapChildren` or `React.Children.map`.');
    var children = this.props.children;
    return children && children.length === 0 ? [children] : children;
  }

};
//# sourceMappingURL=core.js.map