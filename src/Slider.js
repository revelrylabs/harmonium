import React, {Component} from 'react'

export default class Slider extends Component {

  render() {

    const slider = document.getElementById('Slider');
    const output = document.getElementById('demo');

    console.log("object");

    //output.innerHTML = slider.value; // Display the default slider value


    // Update the current slider value (each time you drag the slider handle)
    // slider.oninput = function() {
    //   output.innerHTML = this.value;
    // }

    return (
      <div>
        <div className="Slider-container">
          <input
            type="range"
            min="1"
            max="100"
            value="50"
            className="Slider"
            id="Slider"
          />
          <p>
            Value: <span id="demo">1</span>
          </p>
        </div>
      </div>
    )
  }
}
