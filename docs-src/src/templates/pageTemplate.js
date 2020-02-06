import React from "react"
import { graphql } from "gatsby"
import Layout from '../layouts/index.js'
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
export default function Template({
  location, data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  console.log(markdownRemark)
  const { frontmatter, html } = markdownRemark
  return (<Layout location={location}>
    <Row>
      <Col>
      <h1>{frontmatter.title}</h1>
      <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Col>
    </Row>
  </Layout>)
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
