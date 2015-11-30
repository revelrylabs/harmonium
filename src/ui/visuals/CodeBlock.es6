Rev.registerComponent('CodeBlock', class CodeBlock extends React.Component {

  get className() {
    return this.classAdd({
      'RevCodeBlock': true,
    })
  }

  render() {
    return <pre className={this.className}>{this.props.children}</pre>
  }
})
