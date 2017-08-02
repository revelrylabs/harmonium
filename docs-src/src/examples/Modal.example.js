import React, {Component} from 'react'
import Modal from 'revelry-components/lib/Modal'
import Button from 'revelry-components/lib/Button'
import {Row, Col} from 'revelry-components/lib/grid'

export class Example1 extends Component {
  render() {
    return (
      <Row>
        <Modal isOpen={true}>
          <h2>Modal Example</h2>
          <p>Modal content goes here...</p>
          <a className="Modal-close" href="./index.html">x</a>
        </Modal>
      </Row>
    )
  }
}
