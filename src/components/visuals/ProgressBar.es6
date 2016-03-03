import React from 'react'
import Revelry from '../../revelry'

export default Revelry.registerComponent('ProgressBar', class ProgressBar extends React.Component {

  static get propTypes() {
    return {
      value: React.PropTypes.number,
      minValue: React.PropTypes.number,
      maxValue: React.PropTypes.number,
      success: React.PropTypes.bool,
      secondary: React.PropTypes.bool,
      alert: React.PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      value: 0,
      minValue: 0,
      maxValue: 1,
      success: false,
      secondary: false,
      alert: false,
    }
  }

  get className() {
    return this.classAdd({
      'RevProgressBar': true,
      'progress': true,
      'success': this.props.success,
      'secondary': this.props.secondary,
      'alert': this.props.alert,
    })
  }

  get fillClassName() {
    return this.classSet({
      'RevProgressBar-fill': true,
      'meter': true,
    })
  }

  get fillRatio() {
    let {value, minValue, maxValue} = this.props
    return Math.min(1, (value - minValue) / (maxValue - minValue))
  }

  get fillStyle() {
    return {width: `${this.fillRatio*100}%`}
  }

  render() {
    return <div {...this.props} className={this.className}>
      <span className={this.fillClassName} style={this.fillStyle} />
    </div>
  }

})
