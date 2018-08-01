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
    const {
      min,
      max,
      name,
    } = this.props
    const {value} = this.state

    return (
      <div className="Slider">
        <div className="Slider-range-container">
          <input
            className="Slider-range"
            min={min}
            max={max}
            type="range"
            onChange={this.sliderChange}
            value={value}
          />
        </div>
        <input
          type="text"
          className="Slider-input"
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
  initialValue: PropTypes.number,
  name: PropTypes.string,
}

export default Slider
