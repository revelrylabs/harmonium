Rev.registerComponent('Textarea', class Textarea extends React.Component {
  render() {
    let className = this.classAdd({
      'RevTextarea': true,
    })
    let props = this.getPropsWithout('type')
    return <Rev.Components.Input {...props}
      className={className}
      dom="textarea"
    />
  }
})
