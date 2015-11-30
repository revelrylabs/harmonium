Rev.registerComponent('Select', class Select extends React.Component {
  render() {
    let {Input} = Rev.Components
    return <Input {...this.props} dom="select">
      {this.props.children}
    </Input>
  }
})
