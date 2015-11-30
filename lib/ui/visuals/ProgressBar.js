'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('ProgressBar', (function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProgressBar).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        _extends({}, this.props, { className: this.className }),
        React.createElement('span', { className: this.fillClassName, style: this.fillStyle })
      );
    }
  }, {
    key: 'className',
    get: function get() {
      return this.classAdd({
        'RevProgressBar': true,
        'progress': true,
        'success': this.props.success,
        'secondary': this.props.secondary,
        'alert': this.props.alert
      });
    }
  }, {
    key: 'fillClassName',
    get: function get() {
      return this.classSet({
        'RevProgressBar-fill': true,
        'meter': true
      });
    }
  }, {
    key: 'fillRatio',
    get: function get() {
      var _props = this.props;
      var value = _props.value;
      var minValue = _props.minValue;
      var maxValue = _props.maxValue;

      return Math.min(1, (value - minValue) / (maxValue - minValue));
    }
  }, {
    key: 'fillStyle',
    get: function get() {
      return { width: this.fillRatio * 100 + '%' };
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        value: React.PropTypes.number,
        minValue: React.PropTypes.number,
        maxValue: React.PropTypes.number,
        success: React.PropTypes.bool,
        secondary: React.PropTypes.bool,
        alert: React.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        value: 0,
        minValue: 0,
        maxValue: 1,
        success: false,
        secondary: false,
        alert: false
      };
    }
  }]);

  return ProgressBar;
})(React.Component));
//# sourceMappingURL=ProgressBar.js.map