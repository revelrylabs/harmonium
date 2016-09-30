import React, {Component} from 'react'

export default class ExampleSection extends Component {
  render() {
    const {id, name, component} = this.props
    return (
      <section>
        <h4>{name}</h4>
        <div id={id}>{React.createElement(component, {})}</div>
      </section>
    )
  }
}
