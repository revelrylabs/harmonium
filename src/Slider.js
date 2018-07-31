import React from 'react'

let sliderAmount = 20;
const sliderMin = 0;
const sliderMax = 100;

class Slider extends React.Component {
 
  sliderInput = React.createRef();
  sliderRange = React.createRef();

  sliderChange = (event) => {
    let sliderAmount = this.sliderRange.current.value;
    const input = document.getElementById('Slider-input');
    input.value = sliderAmount;
    //console.log(this.sliderRange.current.value);
  }

  inputChange = (event) => {
    let inputAmount = this.sliderInput.current.value;
    const input = document.getElementById('Slider-input');
    const slider = document.getElementById('Slider');
    slider.value = inputAmount;
    if (inputAmount > sliderMax) {
      slider.value = sliderMax;
      input.value = sliderMax;
    }
    if (inputAmount < sliderMin) {
      slider.value = sliderMin;
      input.value = sliderMin;
    }
    //console.log(this.sliderInput.current.value);
  }



  render() {


    return (
      
      <div className='Slider-container'>
        <input
          className='Slider'
          id='Slider'
          min={sliderMin}
          max={sliderMax}
          type='range'
          defaultValue={sliderAmount}
          onChange={this.sliderChange}
          // onInput={this.sliderChange}
          ref={this.sliderRange}      
        />
        <input
          type='text'
          id='Slider-input'
          defaultValue={sliderAmount}
          ref={this.sliderInput}
          onInput={this.inputChange} 
        />
      </div>  
    )
  }
}

export default Slider

