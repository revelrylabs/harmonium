'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('Pluralize', (function (_React$Component) {
  _inherits(Pluralize, _React$Component);

  function Pluralize() {
    _classCallCheck(this, Pluralize);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pluralize).apply(this, arguments));
  }

  _createClass(Pluralize, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        null,
        this.text
      );
    }
  }, {
    key: 'text',
    get: function get() {
      if (this.props.count === 1) {
        return this.props.count + ' ' + this.props.one;
      }
      return this.props.count + ' ' + (this.props.more || this.props.one + 's');
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        count: React.PropTypes.number.isRequired,
        one: React.PropTypes.string.isRequired,
        more: React.PropTypes.string
      };
    }
  }]);

  return Pluralize;
})(React.Component));
//# sourceMappingURL=Pluralize.js.map