'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('ModelInput', (function (_React$Component) {
  _inherits(ModelInput, _React$Component);

  _createClass(ModelInput, null, [{
    key: 'mixins',
    get: function get() {
      return [Rev.Mixins.ModelInputMixin, Backbone.Events];
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        field: React.PropTypes.string.isRequired,
        model: React.PropTypes.object.isRequired,
        name: React.PropTypes.string,
        baseName: React.PropTypes.string
      };
    }
  }]);

  function ModelInput(props) {
    _classCallCheck(this, ModelInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModelInput).call(this, props));

    _this.state = {
      error: null
    };
    return _this;
  }

  _createClass(ModelInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var formParams = {
        defaultValue: this.defaultValue(),
        name: this.name()
      };

      if (this.isCheckbox()) {
        formParams.defaultChecked = this.value();
      }

      var type = ['textarea', 'select'].find(function (item) {
        return item === _this2.props.type;
      });

      return React.createElement(
        Rev.Components.Input,
        _extends({
          key: this.props.model.cid + '-' + this.name(),
          dom: type
        }, formParams, this.props, {
          onChange: this.onChange.bind(this),
          error: this.state.error,
          onBlur: this.onBlur.bind(this)
        }),
        this.props.children
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.listenTo(this.props.model, 'error', this.onError.bind(this));
    }
  }, {
    key: 'componentDidUnmount',
    value: function componentDidUnmount() {
      this.stopListening();
    }
  }, {
    key: 'onError',
    value: function onError(_model, resp, _options) {
      var errors = resp.responseJSON.errors;

      if (errors && errors[this.props.field]) {
        this.setState({
          error: errors[this.props.field].join(' and ')
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.setState({
        error: null
      });
      this.onFieldChange(e);
    }
  }]);

  return ModelInput;
})(React.Component));
//# sourceMappingURL=ModelInput.js.map