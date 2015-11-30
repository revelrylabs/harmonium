'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('Form', (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _Rev$Components = Rev.Components;
      var AuthenticityToken = _Rev$Components.AuthenticityToken;
      var MethodOverride = _Rev$Components.MethodOverride;

      return React.createElement(
        'form',
        _extends({}, this.props, {
          className: this.className,
          method: this.supportedMethod }),
        React.createElement(AuthenticityToken, null),
        React.createElement(MethodOverride, { method: this.method }),
        this.props.children
      );
    }
  }, {
    key: 'className',
    get: function get() {
      return this.classAdd({
        'RevForm': true
      });
    }
  }, {
    key: 'method',
    get: function get() {
      return this.props.method.toUpperCase();
    }
  }, {
    key: 'supportedMethod',
    get: function get() {
      return this.method === 'GET' ? 'GET' : 'POST';
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        method: 'GET'
      };
    }
  }]);

  return Form;
})(React.Component));
//# sourceMappingURL=Form.js.map