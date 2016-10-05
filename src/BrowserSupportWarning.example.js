import React, {Component} from 'react'
import Callout from './Callout'
import BrowserSupportWarning from './BrowserSupportWarning'

export class Example1 extends Component {
  render() {
    return (
      <Callout>
        <p>Is it empty or no?</p>
        <BrowserSupportWarning minVersions={{chrome: '45', msie: '10'}}>
          <p><strong>Please stop trying to browse the web with a potato.</strong></p>
        </BrowserSupportWarning>
      </Callout>
    )
  }
}

export class Example2 extends Component {
  render() {
    return (
      <Callout>
        <p>Is it empty or no?</p>
        <BrowserSupportWarning minVersions={{chrome: '9999', msie: '9999'}}>
          <p><strong>Please stop trying to browse the web with a potato.</strong></p>
        </BrowserSupportWarning>
      </Callout>
    )
  }
}
