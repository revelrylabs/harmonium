import React, {Component} from 'react'

// For the sake of this demo, we're changing them to make them more visible.
// For real world use, just `import {Row, Col} from './grid'` or whatever.
import {Row as OriginalRow, Col as OriginalCol} from './grid'
const style = {backgroundColor: 'rgba(0,0,0,0.05)'}
const Row = (props) => <OriginalRow {...props} style={style}>{props.children}</OriginalRow>
const Col = (props) => <OriginalCol {...props} style={style}>{props.children}</OriginalCol>

const X = () => <div style={{border: '1px dotted #999'}}>X</div>

export class Intro extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col small={2} large={4}>x</Col>
          <Col small={4} large={4}>x</Col>
          <Col small={6} large={4}>x</Col>
        </Row>
        <Row>
          <Col large={3}>x</Col>
          <Col large={6}>x</Col>
          <Col large={3}>x</Col>
        </Row>
        <Row>
          <Col small={6} large={2}>x</Col>
          <Col small={6} large={8}>x</Col>
          <Col small={12} large={2}>x</Col>
        </Row>
        <Row>
          <Col small={3}>x</Col>
          <Col small={9}>x</Col>
        </Row>
        <Row>
          <Col large={4}>x</Col>
          <Col large={8}>x</Col>
        </Row>
        <Row>
          <Col small={6} large={5}>x</Col>
          <Col small={6} large={7}>x</Col>
        </Row>
        <Row>
          <Col large={6}>x</Col>
          <Col large={6}>x</Col>
        </Row>

      </div>
    )
  }
}

export class Nesting extends Component {
  render() {
    return (
      <Row>
        <Col small={8}>8
          <Row>
            <Col small={8}>8 Nested
              <Row>
                <Col small={8}>8 Nested Again</Col>
                <Col small={4}>4</Col>
              </Row>
            </Col>
            <Col small={4}>4</Col>
          </Row>
        </Col>
        <Col small={4}>4</Col>
      </Row>
    )
  }
}

export class Offsets extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col large={1}>1</Col>
          <Col large={11}>11</Col>
        </Row>
        <Row>
          <Col large={1}>1</Col>
          <Col large={10} largeOffset={1}>10, offset 1</Col>
        </Row>
        <Row>
          <Col large={1}>1</Col>
          <Col large={9} largeOffset={2}>9, offset 2</Col>
        </Row>
        <Row>
          <Col large={1}>1</Col>
          <Col large={8} largeOffset={3}>8, offset 3</Col>
        </Row>
      </div>
    )
  }
}

export class IncompleteRows extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col medium={3}>3</Col>
          <Col medium={3}>3</Col>
          <Col medium={3}>3</Col>
        </Row>
        <Row>
          <Col medium={3}>3</Col>
          <Col medium={3}>3</Col>
          <Col medium={3} end>3 end</Col>
        </Row>
      </div>
    )
  }
}

export class RowCollapse extends Component {
  render() {
    return (
      <Row mediumUncollapse largeUncollapse>
        <Col small={6}>
          Removes gutter at large media query
        </Col>
        <Col small={6}>
          Removes gutter at large media query
        </Col>
      </Row>
    )
  }
}

export class CenteredColumns extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col small={3} smallCentered>3 centered</Col>
        </Row>
        <Row>
          <Col small={6} smallCentered>6 centered</Col>
        </Row>
        <Row>
          <Col small={9} smallCentered largeUncentered>9 centered</Col>
        </Row>
        <Row>
          <Col small={11} smallCentered>11 centered</Col>
        </Row>
      </div>
    )
  }
}

export class SourceOrdering extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col small={10} smallPush={2}>10</Col>
          <Col small={2} smallPull={10}>2, last</Col>
        </Row>
        <Row>
          <Col large={9} largePush={3}>9</Col>
          <Col large={3} largePull={9}>3, last</Col>
        </Row>
        <Row>
          <Col large={8} largePush={4}>8</Col>
          <Col large={4} largePull={8}>4, last</Col>
        </Row>
        <Row>
          <Col small={5} smallPush={7}>7</Col>
          <Col small={7} smallPull={5}>5, last</Col>
        </Row>
        <Row>
          <Col medium={6} mediumPush={6}>6</Col>
          <Col medium={6} mediumPull={6}>6, last</Col>
        </Row>
      </div>
    )
  }
}

export class BlockGrids extends Component {
  render() {
    return (
      <Row smallUp={1} mediumUp={2} largeUp={4}>
        <Col>
          <img src="//placehold.it/300x300" className="thumbnail" alt="" />
        </Col>
        <Col>
          <img src="//placehold.it/300x300" className="thumbnail" alt="" />
        </Col>
        <Col>
          <img src="//placehold.it/300x300" className="thumbnail" alt="" />
        </Col>
        <Col>
          <img src="//placehold.it/300x300" className="thumbnail" alt="" />
        </Col>
        <Col>
          <img src="//placehold.it/300x300" className="thumbnail" alt="" />
        </Col>
        <Col>
          <img src="//placehold.it/300x300" className="thumbnail" alt="" />
        </Col>
      </Row>
    )
  }
}
