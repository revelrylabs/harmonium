'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('Switch', (function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));
  }

  _createClass(Switch, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: this.className },
        React.createElement('input', _extends({}, this.inputProps, { id: this.id, type: 'checkbox' })),
        React.createElement('label', { htmlFor: this.id })
      );
    }
  }, {
    key: 'id',
    get: function get() {
      // Use a props-provided ID if there is one.
      if (this.props.id != null) {
        return this.props.id;
      }
      // Otherwise use a memoized generated unique ID.
      if (this._id == null) {
        this._id = _.uniqueId();
      }
      return this._id;
    }
  }, {
    key: 'className',
    get: function get() {
      return this.classAdd({
        'RevSwitch': true,
        'switch': true
      });
    }
  }, {
    key: 'inputProps',
    get: function get() {
      return this.getPropsWithout('className');
    }
  }]);

  return Switch;
})(React.Component));
//# sourceMappingURL=Switch.js.map