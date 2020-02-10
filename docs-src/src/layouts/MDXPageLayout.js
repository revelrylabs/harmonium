import React from "react"
import Layout from './index.js'
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
export default function MDXPageLayout({
  children, pageContext, location
}) {
  const { frontmatter } = pageContext
  return (<Layout location={location}>
    <Row>
      <Col>
      <h1>{frontmatter.title}</h1>
      <hr/>
      {children}
      </Col>
    </Row>
  </Layout>)
}
