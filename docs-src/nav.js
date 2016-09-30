import React, {Component} from 'react'

export default class Nav extends Component {
  render() {
    const {keys} = this.props
    const elements = keys.map((name) => (
      <li key={name}><a href={`./${name}.html#top`}>{name}</a></li>
    ))
    return (
      <nav>
        <p><a href="./index.html">Home</a></p>
        <ul>{elements}</ul>
      </nav>
    )
  }
}
