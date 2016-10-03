import React, {Component} from 'react'
import Tabs from './Tabs'
import TabBlock from './TabBlock'
import Lipsum from './Lipsum'

export class Stateful extends Component {
  render() {
    return (
      <Tabs>
        <TabBlock key="1" tab="Paragraph 1">
          <h4>Change tabs to switch content</h4>
          <Lipsum p={1} />
        </TabBlock>
        <TabBlock key="2" tab="Paragraph 2">
          <h4>Change tabs to switch content</h4>
          <Lipsum p={2} />
        </TabBlock>
      </Tabs>
    )
  }
}
