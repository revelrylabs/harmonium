import React, {Component} from 'react'
import Nav from './nav'

export default class Layout extends Component {
  render() {
    const {title, children, navKeys} = this.props
    return (
      <html>
        <head>
          <title>{title}</title>
          <script type="text/javascript" src="./bundle.js" />
        </head>
        <body>
          <header>
            <Nav keys={navKeys} />
            <h1 id="top">{title}</h1>
          </header>
          {children}
        </body>
      </html>
    )
  }
}
