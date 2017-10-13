import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  primary: ['rev-Progress--primary'],
  secondary: ['rev-Progress--secondary'],
  tertiary: ['rev-Progress--tertiary'],
  accent: ['rev-Progress--accent'],
  success: ['rev-Progress--success'],
  warning: ['rev-Progress--warning'],
  alert: ['rev-Progress--alert'],
}
const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

export default class Progress extends Component {

  static defaultProps = {
    min: 0,
    max: 100,
  };

  render() {
    const {className, children, min, max, value, ...props} = this.props

    const boolClassNames = []
    BOOL_PROPS.forEach((name) => {
      if(props[name]) {
        boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name] )
      }
      delete props[name]
    })

    const divClassName = classNames(className, 'progress', 'rev-Progress', boolClassNames)

    const ratio = Math.min(1, (value - min) / (max - min))
    const width = `${ratio*100}%`

    const text = children ? (
      <div className="rev-Progress-text">{children}</div>
    ) : null

    return (
      <div {...props} className={divClassName}>
        <div className="rev-Progress-track">
          <div className="rev-Progress-track-amount " style={{width}} />
        </div>
        {text}
      </div>
    )
  }
}
