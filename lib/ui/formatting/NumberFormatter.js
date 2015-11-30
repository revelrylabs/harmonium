'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('NumberFormatter', (function (_React$Component) {
  _inherits(NumberFormatter, _React$Component);

  function NumberFormatter() {
    _classCallCheck(this, NumberFormatter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberFormatter).apply(this, arguments));
  }

  _createClass(NumberFormatter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        null,
        this.text
      );
    }
  }, {
    key: 'optionProps',
    get: function get() {
      return _.omit(this.props, ['locales', 'value']);
    }
  }, {
    key: 'text',
    get: function get() {
      return this.props.value.toLocaleString(this.props.locales, this.optionProps);
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        value: React.PropTypes.number.isRequired,
        locales: React.PropTypes.string,
        localeMatcher: React.PropTypes.oneOf(['lookup', 'best fit']),
        style: React.PropTypes.oneOf(['decimal', 'currency', 'percent']),
        currency: React.PropTypes.string,
        currencyDisplay: React.PropTypes.oneOf(['symbol', 'code', 'name']),
        useGrouping: React.PropTypes.bool,
        minimumIntegerDigits: React.PropTypes.number,
        minimumFractionDigits: React.PropTypes.number,
        maximumFractionDigits: React.PropTypes.number,
        minimumSignificantDigits: React.PropTypes.number,
        maximumSignificantDigits: React.PropTypes.number
      };
    }
  }]);

  return NumberFormatter;
})(React.Component));
//# sourceMappingURL=NumberFormatter.js.map