import React, {Component} from 'react'

export default class Nav extends Component {
  render() {
    const {keys} = this.props
    const elements = keys.map((name) => (
      <li key={name}><a href={`./${name}.html#top`}>{name}</a></li>
    ))
    return (
      <nav>
        <h1><a href="./index.html">CORE</a></h1>
        <ul>{elements}</ul>
      </nav>
    )
  }
}
