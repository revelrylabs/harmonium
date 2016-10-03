import React from 'react'
import Pluralize from './Pluralize'

export class Example1 extends React.Component {
  render() {
    return <Pluralize one="fork" count={1} />
  }
}

export class Example2 extends React.Component {
  render() {
    return <Pluralize one="fork" count={2} />
  }
}

export class Example3 extends React.Component {
  render() {
    return <Pluralize one="goose" more="geese" count={1} />
  }
}

export class Example4 extends React.Component {
  render() {
    return <Pluralize one="goose" more="geese" count={2} />
  }
}
