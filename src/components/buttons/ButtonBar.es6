import React from 'react'
import Revelry from '../../revelry'

export default Revelry.registerComponent('ButtonBar', class ButtonBar extends React.Component {
  render() {
    let className = this.classAdd({
      'RevButtonBar': true,
      'button-bar': true,
    })
    return <div className={className}>
      {this.props.children}
    </div>
  }
})
