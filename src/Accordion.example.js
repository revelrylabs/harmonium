import React, {Component} from 'react'
import Accordion from './Accordion'

export class Stateless extends Component {
  render() {
    return (
      <div>
        <h6>None active</h6>
        <Accordion>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion>
        <h6>1 active</h6>
        <Accordion active={1}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion>
        <h6>2 active</h6>
        <Accordion active={2}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion>
        <h6>Both active (array)</h6>
        <Accordion active={[1, 2]}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion>
        <h6>Both active (object)</h6>
        <Accordion active={{'1': true, '2': true}}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion>
      </div>
    )
  }
}

export class Stateful extends Component {
  render() {
    return (
      <div>
        <h6>None active, click to change</h6>
        <Accordion.Stateful active={1}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
        <h6>1 active, click to change</h6>
        <Accordion.Stateful active={1}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
        <h6>multi, click to toggle each</h6>
        <Accordion.Stateful multi>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
      </div>
    )
  }
}
