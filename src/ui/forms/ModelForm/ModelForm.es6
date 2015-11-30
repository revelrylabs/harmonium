// A form that works with Backbone models to do AJAXy submission & backbone
// validation
Rev.registerComponent('ModelForm', class ModelForm extends React.Component {

  static get mixins() {
    return [Backbone.Events]
  }

  static get propTypes() {
    return {
      model: React.PropTypes.object.isRequired,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      errors: null,
    }
  }

  render() {
    const {Form} = Rev.Components

    return (
      <Form
        method="POST"
        onSubmit={this.onSubmit.bind(this)}
        action={this.formAction()}
        className={this.props.className}
        encType="multipart/form-data"
      >
        {this.props.children}
      </Form>
    )
  }

  formAction() {
    return this.props.action || this.props.model.url()
  }

  formMethod() {
    if(this.props.method) {
      return this.props.method
    }

    if(this.props.model) {
      return this.props.model.isNew() ? 'POST' : 'PATCH'
    }

    return 'POST'
  }

  componentDidMount() {
    this.listenTo(this.props.model, 'error', this.onError.bind(this))
  }

  componentDidUnmount() {
    this.stopListening(this.props.model)
  }

  onError(_model, resp, _options) {
    this.setState({
      errors: resp.responseJSON.errors,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.model.save(null, {
      success: this.props.onSuccess,
      error: this.props.onError,
    })
  }
})
