Rev.registerComponent('MethodOverride', class MethodOverride extends React.Component {
  render() {
    return <input name="_method" type="hidden" value={this.props.method} />
  }
})
