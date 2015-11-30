Rev.registerComponent('AuthenticityToken', class AuthenticityToken extends React.Component {

  static get defaultProps() {
    return {
      name: 'authenticity_token',
    }
  }

  // Calculate the current csrf token by checking the prop override if it exists
  // and falling back to the latest app props if not
  // We check at render time like this (rather than using a default prop)
  // because the router can change the App.props after the class is
  // instantiated, but defaultProps never re-runs
  get value() {
    return this.props.value ||
           (App.props.meta && App.props.meta['csrf-token']) ||
           App.props.csrf_token
  }

  render() {
    return <input
      type="hidden"
      name={this.props.name}
      value={this.value}
    />
  }
})
