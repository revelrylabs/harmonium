import React, {Component} from 'react'
import Accordion from './Accordion'
import Callout from './Callout'

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
        <Callout alert>
          <strong>Think hard before using this. Reasons not to:</strong>
          <ul>
            <li>
              You know what sucks?
              When there is an important piece of site content in item 3...
              but you can{"'"}t hyperlink to it!
            </li>
            <li>
              Once the component is mounted,
              the active item will be stuck until the user clicks a different one.
              No matter what props you give to the component,
              the item will not change.
            </li>
            <li>
              If you are using client-side routing and page transitions,
              and one of those transitions is supposed to take you from item 1
              to item 2 on the same page, the component will stay mounted,
              so its state will not change, and it will be stuck on the item
              it was already on.
            </li>
            <li>
              If you are using something like redux,
              you should use the stateless Accordion component instead,
              and you should manage state in redux.
            </li>
          </ul>
        </Callout>
        <h6>None defaultActive, click to change</h6>
        <Accordion.Stateful>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
        <h6>2 defaultActive, click to change</h6>
        <Accordion.Stateful defaultActive={2}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
        <h6>None defaultActive, multi, click to toggle each</h6>
        <Accordion.Stateful multi>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
        <h6>All defaultActive, multi, click to toggle each</h6>
        <Accordion.Stateful multi defaultActive={[1, 2]}>
          <Accordion.Item contentKey={1} title="One">1</Accordion.Item>
          <Accordion.Item contentKey={2} title="Two">2</Accordion.Item>
        </Accordion.Stateful>
      </div>
    )
  }
}
