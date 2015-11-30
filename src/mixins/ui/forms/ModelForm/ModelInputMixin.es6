Rev.registerMixin('ModelInputMixin', {

  componentDidMount() {
    this.props.model.set(this.props.field, this.defaultValue())
  },

  defaultValue() {
    return this.props.defaultValue || this.value()
  },

  value() {
    return this.props.model &&
           this.props.model.get &&
           this.props.model.get(this.props.field)
  },

  klass() {
    return _.str.underscored(this.props.model.constructor.name)
  },

  name() {
    return this.props.name || `${this.props.baseName || this.klass()}[${this.props.field}]`
  },

  isCheckbox() {
    return this.props.type === 'checkbox'
  },

  onFieldChange(e) {
    const value = e.target[this.isCheckbox() ? 'checked' : 'value']

    this.props.model.set(this.props.field, value)

    if(this.props.onChange) {
      this.props.onChange(e)
    }
  },

  onBlur(_e) {
    const validator = this.props.model[`validate${_.str.classify(this.props.field)}`]

    if(validator) {
      const error = validator.bind(this.props.model)()

      if(error) {
        const errors = {}

        errors[this.props.field] = [error]

        const response = {
          responseJSON: {errors},
        }

        this.props.model.trigger('error', this.props.model, response, {})
      }
    }
  },
})
