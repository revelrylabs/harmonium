import React from 'react'


export default class Panel extends React.Component {
  render() {
    let className = classNames(this.props.className, {
      'RevPanel': true,
      'panel': true,
      'callout': this.props.callout
    })
    return <div {...this.props} className={className}>
      {this.props.children}
    </div>
  }
}
