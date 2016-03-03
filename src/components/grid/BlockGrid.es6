import React from 'react'
import Revelry from '../../revelry'

export default Revelry.registerComponent('BlockGrid', class BlockGrid extends React.Component {

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

    return this.classAdd(classes)
  }

  render() {
    console.warn('BlockGrid is deprecated.')
    return <ul className={this.buildClassName()}>{this.props.children}</ul>
  }
})
