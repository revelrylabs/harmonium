'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('Input', (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'label',
        { className: this.labelClassName },
        this.shouldPutLabelAfterInput ? null : this.innerLabel,
        this.input,
        this.shouldPutLabelAfterInput ? this.innerLabel : null,
        this.error
      );
    }
  }, {
    key: 'typeClassMod',
    get: function get() {
      return this.props.dom === 'input' ? this.props.type : this.props.dom;
    }
  }, {
    key: 'labelClassName',
    get: function get() {
      var labelClassNamesObject = {
        'RevInput': true,
        'RevInput--label': true,
        'error': this.props.error != null
      };
      labelClassNamesObject['RevInput-' + this.typeClassMod] = true; // E.g., "RevInput-checkbox"
      return this.classSet(labelClassNamesObject);
    }
  }, {
    key: 'input',
    get: function get() {
      var props = this.getPropsWithout('dom', 'error', 'className');
      props.className = this.classAdd({
        'RevInput--input': true,
        'error': this.props.error != null
      });
      return React.createElement(this.props.dom, props, this.props.children);
    }
  }, {
    key: 'innerLabel',
    get: function get() {
      return React.createElement(
        'span',
        { className: 'RevInput--innerLabel' },
        this.props.label
      );
    }
  }, {
    key: 'error',
    get: function get() {
      if (this.props.error) {
        return React.createElement(
          'small',
          { className: 'RevError error' },
          this.props.error
        );
      }
      return null;
    }
  }, {
    key: 'shouldPutLabelAfterInput',
    get: function get() {
      return this.props.type === 'checkbox' || this.props.type === 'radio';
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        dom: 'input',
        type: 'text'
      };
    }
  }]);

  return Input;
})(React.Component));
//# sourceMappingURL=Input.js.map