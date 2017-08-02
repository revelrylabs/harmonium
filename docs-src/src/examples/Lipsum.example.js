import React, {Component} from 'react'
import Lipsum from 'revelry-components/lib/Lipsum'

export class Paragraph1 extends Component {
  render() {
    return <Lipsum p={1} />
  }
}

export class Paragraph2 extends Component {
  render() {
    return <Lipsum p={2} />
  }
}

export class Paragraph3 extends Component {
  render() {
    return <Lipsum p={3} />
  }
}
