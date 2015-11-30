Rev.registerComponent('Input', class Input extends React.Component {

  static get defaultProps() {
    return {
      dom: 'input',
      type: 'text',
    }
  }

  get typeClassMod() {
    return this.props.dom === 'input' ? this.props.type : this.props.dom
  }

  get labelClassName() {
    let labelClassNamesObject = {
      'RevInput': true,
      'RevInput--label': true,
      'error': this.props.error != null,
    }
    labelClassNamesObject[`RevInput-${this.typeClassMod}`] = true // E.g., "RevInput-checkbox"
    return this.classSet(labelClassNamesObject)
  }

  get input() {
    let props = this.getPropsWithout('dom', 'error', 'className')
    props.className = this.classAdd({
      'RevInput--input': true,
      'error': this.props.error != null,
    })
    return React.createElement(this.props.dom, props, this.props.children)
  }

  get innerLabel() {
    return <span className="RevInput--innerLabel">{this.props.label}</span>
  }

  get error() {
    if(this.props.error) {
      return <small className="RevError error">{this.props.error}</small>
    }
    return null
  }

  get shouldPutLabelAfterInput() {
    return this.props.type === 'checkbox' || this.props.type === 'radio'
  }

  render() {
    return <label className={this.labelClassName}>
      {this.shouldPutLabelAfterInput ? null : this.innerLabel}
      {this.input}
      {this.shouldPutLabelAfterInput ? this.innerLabel : null}
      {this.error}
    </label>
  }

})
