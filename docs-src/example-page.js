import React, {Component} from 'react'
import Layout from './layout'
import ExampleSection from './example-section'
import Source from './source'
import {Row, Col} from '../src/grid'

export default class ExamplePage extends Component {
  render() {
    const {name, navKeys, componentSrc, examplesSrc, exampleComponents} = this.props
    const examples = Object.keys(exampleComponents).map(function(key) {
      const component = exampleComponents[key]
      const id = `${name}_examples_${key}`
      return <ExampleSection key={key} id={id} name={key} component={component} />
    })
    const examplesNavItems = examples.map(function(instance) {
      const {name, id} = instance.props
      return <li key={name}><a href={`#${id}`}>{name}</a></li>
    })
    return (
      <Layout title={name} navKeys={navKeys}>
        <nav>
          <ol>
            <li><a href="#examples">Examples</a></li>
            <ol>
              {examplesNavItems}
            </ol>
            <li><a href="#source">Source</a></li>
          </ol>
        </nav>
        <Row id="examples">
          <Col><h2>Examples</h2></Col>
          <Col medium={6} id="examples-rendered">
            {examples}
          </Col>
          <Col medium={6} id="examples-source">
            <Source src={examplesSrc} />
          </Col>
        </Row>
        <section id="source">
          <h2>Source</h2>
          <Source src={componentSrc} />
        </section>
      </Layout>
    )
  }
}
