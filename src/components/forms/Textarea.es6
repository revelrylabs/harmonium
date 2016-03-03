import React from 'react'
import Revelry from '../../revelry'
import Input from './Input'

export default Revelry.registerComponent('Textarea', class Textarea extends React.Component {
  render() {
    let className = this.classAdd({
      'RevTextarea': true,
    })
    let props = this.getPropsWithout('type')
    return <Input {...props}
      className={className}
      dom="textarea"
    />
  }
})
