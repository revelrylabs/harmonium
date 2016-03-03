import React from 'react'
import Backbone from 'backbone'
import Revelry from '../../revelry'
import ModelInputMixin from '../../mixins/ModelInputMixin'

Revelry.registerComponent('ModelInput', class ModelInput extends React.Component {
  static get mixins() {
    return [ModelInputMixin, Backbone.Events]
  }

  static get propTypes() {
    return {
      field: React.PropTypes.string.isRequired,
      model: React.PropTypes.object.isRequired,
      name: React.PropTypes.string,
      baseName: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  render() {
    const formParams = {
      defaultValue: this.defaultValue(),
      name: this.name(),
    }

    if(this.isCheckbox()) {
      formParams.defaultChecked = this.value()
    }

    const type = ['textarea', 'select'].find((item) => item === this.props.type)

    return (
      <Revelry.Components.Input
        key={`${this.props.model.cid}-${this.name()}`}
        dom={type}
        {...formParams}
        {...this.props}
        onChange={this.onChange.bind(this)}
        error={this.state.error}
        onBlur={this.onBlur.bind(this)}
      >
        {this.props.children}
      </Revelry.Components.Input>
    )
  }

  componentWillMount() {
    this.listenTo(this.props.model, 'error', this.onError.bind(this))
  }

  componentDidUnmount() {
    this.stopListening()
  }

  onError(_model, resp, _options) {
    const errors = resp.responseJSON.errors

    if(errors && errors[this.props.field]) {
      this.setState({
        error: errors[this.props.field].join(' and '),
      })
    }
  }

  onChange(e) {
    this.setState({
      error: null,
    })
    this.onFieldChange(e)
  }
})
