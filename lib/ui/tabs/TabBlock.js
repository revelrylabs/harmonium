'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('TabBlock', (function (_React$Component) {
  _inherits(TabBlock, _React$Component);

  function TabBlock() {
    _classCallCheck(this, TabBlock);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TabBlock).apply(this, arguments));
  }

  _createClass(TabBlock, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', _extends({}, this.props, {
        className: this.className,
        key: this.props.key
      }));
    }
  }, {
    key: 'className',
    get: function get() {
      return this.classAdd({
        'RevTabBlock': true,
        'RevTabBlock--active': this.props.active,
        'content': true,
        'active': this.props.active
      });
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        active: React.PropTypes.bool
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        active: false
      };
    }
  }]);

  return TabBlock;
})(React.Component));
//# sourceMappingURL=TabBlock.js.map