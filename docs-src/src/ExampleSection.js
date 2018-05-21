import React from 'react'
import {Row, Col} from 'harmonium/lib/grid'
import Playground from 'component-playground'

export default function ExampleSection({title, depth, examples, scope}) {
  if (typeof examples === 'string') {
    return (
      <div>
        <Playground codeText={examples} scope={scope} />
      </div>
    )
  } else {
    const children = []

    for (const examplesTitle in examples) {
      if (Object.prototype.hasOwnProperty.call(examples, examplesTitle)) {
        children.push(
          <ExampleSection
            title={examplesTitle}
            examples={examples[examplesTitle]}
            depth={depth + 1}
            scope={scope}
            key={examplesTitle}
          />
        )
      }
    }

    return (
      <Row collapse>
        <Col>
          {React.createElement(`h${Math.min(6, depth + 1)}`, {}, title)}
          {children}
        </Col>
      </Row>
    )
  }
}
