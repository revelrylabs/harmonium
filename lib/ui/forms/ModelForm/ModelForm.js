"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// A form that works with Backbone models to do AJAXy submission & backbone
// validation
Rev.registerComponent('ModelForm', (function (_React$Component) {
  _inherits(ModelForm, _React$Component);

  _createClass(ModelForm, null, [{
    key: "mixins",
    get: function get() {
      return [Backbone.Events];
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        model: React.PropTypes.object.isRequired
      };
    }
  }]);

  function ModelForm(props) {
    _classCallCheck(this, ModelForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModelForm).call(this, props));

    _this.state = {
      errors: null
    };
    return _this;
  }

  _createClass(ModelForm, [{
    key: "render",
    value: function render() {
      var Form = Rev.Components.Form;

      return React.createElement(
        Form,
        {
          method: "POST",
          onSubmit: this.onSubmit.bind(this),
          action: this.formAction(),
          className: this.props.className,
          encType: "multipart/form-data"
        },
        this.props.children
      );
    }
  }, {
    key: "formAction",
    value: function formAction() {
      return this.props.action || this.props.model.url();
    }
  }, {
    key: "formMethod",
    value: function formMethod() {
      if (this.props.method) {
        return this.props.method;
      }

      if (this.props.model) {
        return this.props.model.isNew() ? 'POST' : 'PATCH';
      }

      return 'POST';
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.listenTo(this.props.model, 'error', this.onError.bind(this));
    }
  }, {
    key: "componentDidUnmount",
    value: function componentDidUnmount() {
      this.stopListening(this.props.model);
    }
  }, {
    key: "onError",
    value: function onError(_model, resp, _options) {
      this.setState({
        errors: resp.responseJSON.errors
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      this.props.model.save(null, {
        success: this.props.onSuccess,
        error: this.props.onError
      });
    }
  }]);

  return ModelForm;
})(React.Component));
//# sourceMappingURL=ModelForm.js.map