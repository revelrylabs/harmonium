import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.initialValue,
    }
  }

  sliderChange = (e) => {
    this.setState({value: e.target.value})
  }

  inputChange = (e) => {
    const {min, max} = this.props
    const {value} = e.target

    if (value > max) {
      this.setState({value: max})
    } else if (value < min) {
      this.setState({value: min})
    } else {
      this.setState({value})
    }
  }

  render() {
    const {name, ...rangeInputProps} = this.props
    const {value} = this.state

    return (
      <div className="rev-Slider">
        <div className="rev-Slider-range-container">
          <input
            className="rev-Slider-range"
            {...rangeInputProps}
            type="range"
            onChange={this.sliderChange}
            value={value}
          />
        </div>
        <input
          type="text"
          className="rev-Slider-input"
          onChange={this.inputChange}
          name={name}
          value={value}
        />
      </div>
    )
  }
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  initialValue: PropTypes.number,
  name: PropTypes.string,
}

export default Slider
