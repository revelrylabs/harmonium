Rev.registerComponent('Form', class Form extends React.Component {

  static get defaultProps() {
    return {
      method: 'GET',
    }
  }

  get className() {
    return this.classAdd({
      'RevForm': true,
    })
  }

  get method() {
    return this.props.method.toUpperCase()
  }

  get supportedMethod() {
    return this.method === 'GET' ? 'GET' : 'POST'
  }

  render() {
    let {AuthenticityToken, MethodOverride} = Rev.Components

    return <form {...this.props}
      className={this.className}
      method={this.supportedMethod}>
      <AuthenticityToken />
      <MethodOverride method={this.method} />
      {this.props.children}
    </form>
  }
})
