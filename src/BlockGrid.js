import React from 'react'
import classNames from 'classnames'

export default class BlockGrid extends React.Component {

  buildClassName() {
    const classes = {
      'RevBlockGrid': true,
    }

    const addNum = (propName) => {
      const prop = this.props[propName]

      if(prop) {
        classes[`${propName}-block-grid-${prop}`] = true
      }
    }

    addNum('small')
    addNum('medium')
    addNum('large')

    return classNames(this.props.className, classes)
  }

  render() {
    console.warn('BlockGrid is deprecated.')
    return <ul className={this.buildClassName()}>{this.props.children}</ul>
  }
}
