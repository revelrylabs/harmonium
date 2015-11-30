'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('Col', (function (_React$Component) {
  _inherits(Col, _React$Component);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Col).apply(this, arguments));
  }

  _createClass(Col, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        _extends({}, this.props, { className: this.className }),
        this.props.children
      );
    }
  }, {
    key: 'className',
    get: function get() {
      var _this2 = this;

      var classNamesObject = {
        'RevCol': true,
        'columns': true
      };

      this.constructor.boolProps.forEach(function (x) {
        if (_this2.props[x]) {
          classNamesObject[_.str.dasherize(x)] = true;
        }
      });

      this.constructor.numberProps.forEach(function (x) {
        var count = _this2.props[x];
        if (count != null) {
          classNamesObject[_.str.dasherize(x) + '-' + count] = true;
        }
      });

      return this.classAdd(classNamesObject);
    }
  }], [{
    key: 'boolProps',
    get: function get() {
      return this._boolProps = this._boolProps || ['end', 'smallCentered', 'mediumCentered', 'largeCentered', 'smallUncentered', 'mediumUncentered', 'largeUncentered'];
    }
  }, {
    key: 'numberProps',
    get: function get() {
      return this._numberProps = this._numberProps || ['small', 'smallOffset', 'smallPush', 'smallPull', 'medium', 'mediumOffset', 'mediumPush', 'mediumPull', 'large', 'largeOffset', 'largePush', 'largePull'];
    }
  }, {
    key: 'propTypes',
    get: function get() {
      var propTypes = {};
      this.boolProps.forEach(function (x) {
        return propTypes[x] = React.PropTypes.bool;
      });
      this.numberProps.forEach(function (x) {
        return propTypes[x] = React.PropTypes.oneOf([1, '1', 2, '2', 3, '3', 4, '4', 5, '5', 6, '6', 7, '7', 8, '8', 9, '9', 10, '10', 11, '11', 12, '12']);
      });
      return propTypes;
    }
  }]);

  return Col;
})(React.Component));
//# sourceMappingURL=Col.js.map