import React from 'react'
import {Row, Col} from 'awesome-possum/lib/grid'
import Playground from 'component-playground'

export default function ExampleSection({title, depth, examples, scope}) {
  if (typeof examples === "string") {
    return (
      <div>
        <Playground codeText={examples} scope={scope} />
      </div>
    )
  } else {
    const children = []

    for(let title in examples) {
      children.push(
        <ExampleSection
          title={title}
          examples={examples[title]}
          depth={depth + 1}
          scope={scope}
          key={title}
        />
      )
    }

    return (
      <Row collapse>
        <Col>
          {React.createElement(`h${Math.min(6, depth)}`, {}, title)}
          {children}
        </Col>
      </Row>
    )
  }
}
