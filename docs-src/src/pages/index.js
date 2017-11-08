import React from 'react'
import {Row, Col} from 'revelry-components/lib/grid'
import Card from 'revelry-components/lib/Card'
import Menu from 'revelry-components/lib/Menu'
import HelpText from 'revelry-components/lib/HelpText'

const IndexPage = () => (
  <div>

    <Row>
      <Col>
        <h1>This is an h1. Longer title so that it will wrap to multiple lines</h1>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
        <h2>This is an h2. Longer title so that it will wrap to multiple lines</h2>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
        <h3>This is an h3. Longer title so that it will wrap to multiple lines</h3>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
        <h4>This is an h4. Longer title so that it will wrap to multiple lines</h4>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
        <h5>This is an h5. Longer title so that it will wrap to multiple lines</h5>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
        <h6>This is an h6. Longer title so that it will wrap to multiple lines</h6>
        <p>The World Wide Web has been central to the development of the Information Age and is the primary tool billions of people use to interact on the Internet.[4][5][6] Web pages are primarily text documents formatted and annotated with Hypertext Markup Language (HTML).</p>
      </Col>
    </Row>
    <Row>
      <Col>
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
