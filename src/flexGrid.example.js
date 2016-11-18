import React, {Component} from 'react'
import {Row, Col} from './flexGrid'
import Lipsum from './Lipsum'

export class FlexGrid extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col small={6}>
            cool
          </Col>
          <Col small={6}>
            yeah
          </Col>
        </Row>
        <Row>
          <Col medium={6} large={4}>
            cool
          </Col>
          <Col medium={6} large={8}>
            yeah
          </Col>
        </Row>
        <Row>
          <Col small={4}>
            4 columns
          </Col>
          <Col>
            {"Whatever's left!"}
          </Col>
        </Row>
        <Row>
          <Col small={4}>
            4 columns
          </Col>
          <Col>
            {"Whatever's left!"}
          </Col>
          <Col>
            {"Whatever's left!"}
          </Col>
        </Row>
        <Row>
          <Col shrink>
            Shrink!
          </Col>
          <Col>
            Expand!
          </Col>
        </Row>
        <Row>
          <Col small={12} largeExpand>
            cool
          </Col>
          <Col small={12} largeExpand>
            cool
          </Col>
          <Col small={12} largeExpand>
            cool
          </Col>
          <Col small={12} largeExpand>
            cool
          </Col>
          <Col small={12} largeExpand>
            cool
          </Col>
          <Col small={12} largeExpand>
            cool
          </Col>
        </Row>
        <Row mediumUnstack>
          <Col>
            cool
          </Col>
          <Col>
            cool
          </Col>
          <Col>
            cool
          </Col>
          <Col>
            cool
          </Col>
          <Col>
            cool
          </Col>
          <Col>
            cool
          </Col>
        </Row>
        <Row>
          <Col small={4}>
            Aligned to
          </Col>
          <Col small={4}>
            the Left
          </Col>
        </Row>
        <Row alignRight>
          <Col small={4}>
            Aligned to
          </Col>
          <Col small={4}>
            the right
          </Col>
        </Row>
        <Row alignCenter>
          <Col small={4}>
            Aligned to
          </Col>
          <Col small={4}>
            the middle
          </Col>
        </Row>
        <Row alignJustify>
          <Col small={4}>
            Aligned to
          </Col>
          <Col small={4}>
            the middle
          </Col>
        </Row>
        <Row alignSpaced>
          <Col small={4}>
            Aligned to
          </Col>
          <Col small={4}>
            the middle
          </Col>
        </Row>
        <Row alignMiddle>
          <Col>
            {"I'm in the middle!"}
          </Col>
          <Col>
            <Lipsum />
          </Col>
        </Row>
        <Row>
          <Col alignSelfBottom>
            Align bottom
          </Col>
          <Col alignSelfBottom>
            Align middle
          </Col>
          <Col>
            Align top
          </Col>
          <Col>
            <Lipsum />
          </Col>
        </Row>
        <Row smallCollapse mediumCollapse>
          <Col small={6}>
            Removes gutter at small media query and adds at medium.
          </Col>
          <Col small={6}>
            Removes gutter at small media query and adds at medium.
          </Col>
        </Row>
        <Row>
          <Col small={4} largeOffset={2}>
            Offset 2 on large
          </Col>
          <Col small={4}>
            4 columns
          </Col>
        </Row>
        <Row>
          <Col smallOrder={2} mediumOrder={1}>
            This column will come second on small, and first on medium and larger.
          </Col>
          <Col smallOrder={1} mediumOrder={2}>
            This column will come first on small, and second on medium and larger.
          </Col>
        </Row>
        <Row smallUp={1} mediumUp={2} largeUp={3}>
          <Col>
            1 per row on small
          </Col>
          <Col>
            2 per row on medium
          </Col>
          <Col>
            3 per row on large
          </Col>
        </Row>
      </div>
    )
  }
}
