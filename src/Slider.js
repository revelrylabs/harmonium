import React from 'react'

class Slider extends React.Component {



  sliderChange = () => {
    const rangeValue = this.sliderRangeRef.current.value
    const input = document.getElementById('Slider-input')

    input.value = rangeValue
  }

  inputChange = () => {
    const inputAmount = this.sliderInput.current.value
    const input = document.getElementById('Slider-input')

    slider.value = inputAmount

    // TODO grab value from props
    const sliderMin = 0
    const sliderMax = 100

    // TODO Refactor
    if (inputAmount > sliderMax) {
      slider.value = sliderMax
      input.value = sliderMax
    }
    if (inputAmount < sliderMin) {
      slider.value = sliderMin
      input.value = sliderMin
    }
  }

  render() {
    return (
      <div className="Slider Slider-container">
        <div className="Slider-range-container">
          <input
            className="Slider-range"
            id="Slider-range"
            min={this.props.sliderMin}
            max={this.props.sliderMax}
            type="range"
            defaultValue={this.props.initialValue}
            onChange={this.sliderChange}
            // onInput={this.sliderChange}
            ref={this.sliderRangeRef}
          />
          <span
            className="Slider-progress"
            id="Slider-progress"
            ref={this.sliderProgressRef}
            // style={{width: this.state.progress}}
          />
        </div>
        <input
          type="text"
          id="Slider-input"
          defaultValue={this.props.initialValue}
          onInput={this.inputChange}
          ref={this.sliderInput}
        />
      </div>
    )
  }
}

export default Slider
