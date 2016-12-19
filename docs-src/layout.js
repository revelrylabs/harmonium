import React, {Component} from 'react'
import {Row, Col} from '../src/grid'
import Nav from './nav'

export default class Layout extends Component {
  render() {
    const {title, children, navKeys, activeKey} = this.props
    return (
      <html>
        <head>
          <title>{title}</title>
          <script type="text/javascript" src="./bundle.js" />
          <link href="http://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css" rel="stylesheet" />
          <link rel="stylesheet" href="./site.css" />
          <style>
            {
              "pre {overflow:auto;}" +
              "pre code {display:block;}"
            }
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/foundation.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/languages/javascript.min.js" />
          <script>hljs.initHighlightingOnLoad();</script>
        </head>
        <body>
          <Row>
            <Col large={2} medium={3} style={{overflow: 'auto'}}>
              <Nav keys={navKeys} activeKey={activeKey} />
            </Col>
            <Col large={10} medium={9}>
              <h1 id="top">{title}</h1>
              {children}
            </Col>
          </Row>
        </body>
      </html>
    )
  }
}
