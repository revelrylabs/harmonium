import React, {Component} from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  secondary: ['secondary', 'rev-Progress--secondary'],
  success: ['success', 'rev-Progress--success'],
  warning: ['warning', 'rev-Progress--warning'],
  alert: ['alert', 'rev-Progress--alert'],
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
      <p className="progress-meter-text rev-Progress-meter-text">{children}</p>
    ) : null

    return (
      <div {...props} className={divClassName}>
        <div className="progress-meter rev-Progress-meter" style={{width}}>
          {text}
        </div>
      </div>
    )
  }
}
