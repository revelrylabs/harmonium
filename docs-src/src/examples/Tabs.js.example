import React, {Component} from 'react'
import Tabs from 'revelry-components/lib/Tabs'
import Lipsum from 'revelry-components/lib/Lipsum'
import Callout from 'revelry-components/lib/Callout'
import {Row, Col} from 'revelry-components/lib/grid'

export class Stateless extends Component {
  render() {
    return (
      <Row>
        <Col>
          <h6>default to first tab</h6>
          <Tabs>
            <Tabs.Item contentKey={1} title="One">
              <Lipsum p={1} />
            </Tabs.Item>
            <Tabs.Item contentKey={2} title="Two">
              <Lipsum p={2} />
            </Tabs.Item>
          </Tabs>
        </Col>
        <Col>
          <h6>explicitly set active to 2</h6>
          <Tabs active={2}>
            <Tabs.Item contentKey={1} title="One">
              <Lipsum p={1} />
            </Tabs.Item>
            <Tabs.Item contentKey={2} title="Two">
              <Lipsum p={2} />
            </Tabs.Item>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

export class Stateful extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Callout alert>
              <strong>Think hard before using this. Reasons not to:</strong>
              <ul>
                <li>
                  You know what sucks?
                  When there is an important piece of site content in tab 3...
                  but you can{"'"}t hyperlink to it!
                </li>
                <li>
                  Once the component is mounted,
                  the active tab will be stuck until the user clicks a different one.
                  No matter what props you give to the component,
                  the tab will not change.
                </li>
                <li>
                  If you are using client-side routing and page transitions,
                  and one of those transitions is supposed to take you from tab 1
                  to tab 2 on the same page, the component will stay mounted,
                  so its state will not change, and it will be stuck on the tab
                  it was already on.
                </li>
                <li>
                  If you are using something like redux,
                  you should use the stateless Tabs component instead,
                  and you should manage state in redux.
                </li>
              </ul>
            </Callout>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>default to first tab</h6>
            <Tabs.Stateful>
              <Tabs.Item contentKey={1} title="One">
                <Lipsum p={1} />
              </Tabs.Item>
              <Tabs.Item contentKey={2} title="Two">
                <Lipsum p={2} />
              </Tabs.Item>
            </Tabs.Stateful>
          </Col>
          <Col>
            <h6>explicitly set defaultActive to 2</h6>
            <Tabs.Stateful defaultActive={2}>
              <Tabs.Item contentKey={1} title="One">
                <Lipsum p={1} />
              </Tabs.Item>
              <Tabs.Item contentKey={2} title="Two">
                <Lipsum p={2} />
              </Tabs.Item>
            </Tabs.Stateful>
          </Col>
        </Row>
      </div>
    )
  }
}

export class Vertical extends Component {
  render() {
    return (
      <Callout alert>
        <strong>Vertical tabs are NOT implemented yet.</strong>
        <p>
          A good implementation requires end-developer control over the layout.
          We have not yet figured out a good API for this that lets the developer
          mess around with grids and/or flex box.
        </p>
      </Callout>
    )
  }
}
