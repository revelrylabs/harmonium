import React from 'react'
import {Row, Col} from 'harmonium/lib/grid'
import Playground from 'component-playground'

export default function ExampleSection({title, depth, examples, scope}) {
  if (typeof examples === 'string') {
    return (
      <Playground theme="lucario" collapsableCode={true} codeText={examples} scope={scope} />
    )
  } else {
    const children = []

    for (const examplesTitle in examples) {
      if (Object.prototype.hasOwnProperty.call(examples, examplesTitle)) {
        children.push(
          <ExampleSection
            examples={examples[examplesTitle]}
            scope={scope}
            key={examplesTitle}
          />
        )
      }
    }

    return (
      <Row collapse>
        <Col>
          {children}
        </Col>
      </Row>
    )
  }
}
