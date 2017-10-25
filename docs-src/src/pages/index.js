import React from 'react'
import {Row, Col} from 'revelry-components/lib/grid'
import Card from 'revelry-components/lib/Card'
import Menu from 'revelry-components/lib/Menu'
import HelpText from 'revelry-components/lib/HelpText'

const IndexPage = () => (
  <div>
    <Row>
      <Col>
        <h2>Color Swatches</h2>
      </Col>
      <Col small={6} medium={4}>
        <Card>
          <div className="ExampleSwatches ExampleSwatches--primary"></div>
          <Card.Footer>
            <Row>
              <Col><HelpText>$primary</HelpText></Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
      <Col small={6} medium={4}>
        <Card>
          <div className="ExampleSwatches ExampleSwatches--secondary"></div>
          <Card.Footer>
            <Row>
              <Col><HelpText>$secondary</HelpText></Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
      <Col small={6} medium={4}>
        <Card>
          <div className="ExampleSwatches ExampleSwatches--tertiary"></div>
          <Card.Footer>
            <Row>
              <Col><HelpText>$tertiary</HelpText></Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
      <Col small={6} medium={4}>
        <Card>
          <div className="ExampleSwatches ExampleSwatches--success"></div>
          <Card.Footer>
            <Row>
              <Col><HelpText>$success</HelpText></Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
      <Col small={6} medium={4}>
        <Card>
          <div className="ExampleSwatches ExampleSwatches--warning"></div>
          <Card.Footer>
            <Row>
              <Col><HelpText>$warning</HelpText></Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
      <Col small={6} medium={4}>
        <Card>
          <div className="ExampleSwatches ExampleSwatches--alert"></div>
          <Card.Footer>
            <Row>
              <Col><HelpText>$alert</HelpText></Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <h1>This is an h1.</h1>
        <h2>This is an h2</h2>
        <h3>This is an h3.</h3>
        <h4>This is an h4.</h4>
        <h5>This is an h5.</h5>
        <h6>This is an h6.</h6>
      </Col>
    </Row>
    <Row>
      <Col>
        <p className="Lead">The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.</p>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
      </Col>
      <Col medium={6}>
        <Card>
          <Menu>
            <Menu.Item><a href="#">List</a></Menu.Item>
            <Menu.Item><a href="#">List</a></Menu.Item>
            <Menu.Item><a href="#">List</a></Menu.Item>
            <Menu.Item><a href="#">List</a></Menu.Item>
          </Menu>
        </Card>
      </Col>
      <Col medium={6}>
        <Menu>
          <Menu.Item text>List</Menu.Item>
          <Menu.Item text>List</Menu.Item>
          <Menu.Item text>List</Menu.Item>
          <Menu.Item text>List</Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default IndexPage
