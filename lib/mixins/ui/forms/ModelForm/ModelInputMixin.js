'use strict';

Rev.registerMixin('ModelInputMixin', {
  componentDidMount: function componentDidMount() {
    this.props.model.set(this.props.field, this.defaultValue());
  },
  defaultValue: function defaultValue() {
    return this.props.defaultValue || this.value();
  },
  value: function value() {
    return this.props.model && this.props.model.get && this.props.model.get(this.props.field);
  },
  klass: function klass() {
    return _.str.underscored(this.props.model.constructor.name);
  },
  name: function name() {
    return this.props.name || (this.props.baseName || this.klass()) + '[' + this.props.field + ']';
  },
  isCheckbox: function isCheckbox() {
    return this.props.type === 'checkbox';
  },
  onFieldChange: function onFieldChange(e) {
    var value = e.target[this.isCheckbox() ? 'checked' : 'value'];

    this.props.model.set(this.props.field, value);

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },
  onBlur: function onBlur(_e) {
    var validator = this.props.model['validate' + _.str.classify(this.props.field)];

    if (validator) {
      var error = validator.bind(this.props.model)();

      if (error) {
        var errors = {};

        errors[this.props.field] = [error];

        var response = {
          responseJSON: { errors: errors }
        };

        this.props.model.trigger('error', this.props.model, response, {});
      }
    }
  }
});
//# sourceMappingURL=ModelInputMixin.js.map