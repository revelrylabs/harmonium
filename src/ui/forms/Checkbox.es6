Rev.registerComponent('Checkbox', class Checkbox extends React.Component {
  render() {
    return <Rev.Components.Input {...this.props} type="checkbox" />
  }
})
