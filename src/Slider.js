import React from 'react'

class Slider extends React.Component {

  //sliderInput = React.createRef();
  //sliderRangeRef = React.createRef();

  sliderChange = () => {
    let rangeValue = this.sliderRangeRef.current.value;
    const input = document.getElementById('Slider-input');
    input.value = rangeValue;
  }

  inputChange = () => {
    let inputAmount = this.sliderInput.current.value;
    const input = document.getElementById('Slider-input');
    const slider = document.getElementById('Slider-range');
    slider.value = inputAmount;

    const sliderMin=this.props.minValue
    const sliderMax=this.props.maxValue

    // TODO Refactor
    if (inputAmount > sliderMax) {
      slider.value = sliderMax;
      input.value = sliderMax;
    }
    if (inputAmount < sliderMin) {
      slider.value = sliderMin;
      input.value = sliderMin;
    }
  }

  render() {
    return (
      <div className='Slider'>
        <div className="Slider-range-container"> 
          <input
            className='Slider-range'
            id='Slider-range'
            min={this.props.sliderMin}
            max={this.props.sliderMax}
            type='range'
            defaultValue={this.props.initialValue}
            //onChange={this.sliderChange}
            //onInput={this.sliderChange}
            //ref={this.sliderRangeRef}
          />
        </div> 
        <input
          type='text'
          className='Slider-input'
          id='Slider-input'
          defaultValue={this.props.initialValue}
          //onInput={this.inputChange} 
          //ref={this.sliderInput}
        />
      </div>
    )
  }
}

export default Slider
